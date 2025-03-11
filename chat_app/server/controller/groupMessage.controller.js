import cloudinary from "../lib/cloudinary.js";
import { io } from "../lib/socket.js";
import GroupMessage from "../models/group-message.models.js";
import Group from "../models/group.model.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Send Group Message
export const sendGroupMessage = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { text } = req.body;
    const senderId = req.user._id;

    // Check if the group exists
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    // Check if user is a member of the group
    if (!group.members.includes(senderId)) {
      return res
        .status(403)
        .json({ message: "You are not a member of this group" });
    }

    let imageUrl = null;
    let fileUrl = null;

    // Handle image upload
    if (req.files?.image?.[0]) {
      const imageFile = req.files.image[0];
      imageUrl = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "image" }, (error, result) => {
            if (error) reject("Image upload failed");
            resolve(result.secure_url);
          })
          .end(imageFile.buffer);
      });
    }

    // Handle file upload
    if (req.files?.file?.[0]) {
      const fileData = req.files.file[0];
      fileUrl = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "auto" }, (error, result) => {
            if (error) reject("File upload failed");
            resolve(result.secure_url);
          })
          .end(fileData.buffer);
      });
    }

    const message = await GroupMessage.create({
      groupId,
      senderId,
      text,
      image: imageUrl,
      file: fileUrl,
    });

    await message.save();

    // Emit real-time message to group members
    io.to(groupId).emit("receiveGroupMessage", message);

    res.status(201).json(message);
  } catch (error) {
    console.error("Error sending group message:", error);
    res.status(500).json({ message: "Error sending message" });
  }
};

export const getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params;

    // Check if group exists
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    // Fetch messages and populate sender details
    const messages = await GroupMessage.find({ groupId })
      .populate("senderId", "fullName profilePic")
      .sort({ createdAt: -1 })
      .limit(20)
      .skip(req.query.page * 20);

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
};

// Delete a Message (Only sender or admin can delete)
export const deleteGroupMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id;

    const message = await GroupMessage.findById(messageId);
    if (!message) return res.status(404).json({ message: "Message not found" });

    const group = await Group.findById(message.groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    // Check if the user is the sender or group admin
    if (
      message.senderId.toString() !== userId.toString() &&
      group.admin.toString() !== userId.toString()
    ) {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this message" });
    }

    await GroupMessage.findByIdAndDelete(messageId);

    io.to(group._id.toString()).emit("deleteGroupMessage", messageId);

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting message" });
  }
};

export const uploadMiddleware = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "file", maxCount: 1 },
]);
