import Message from "../models/message.model.js";
import User from "../models/users.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketID, io } from "../lib/socket.js";
import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer ({ storage: storage})

// export const getUsersForSideBar = async (req, res) => {
//   try {
//     const loggedInUser = req.user._id;
//     const filterUsers = await User.find({ _id: { $ne: loggedInUser } }).select(
//       "-password"
//     );

//     if (filterUsers) {
//       return res.status(200).json(filterUsers);
//     } else {
//       return res.status(404).json({ message: "No users found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const { search } = req.query;

    let query = { _id: { $ne: loggedInUser }}

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" }},
        { email: { $regex: search, $options: "i" }}
      ]
    }

    const user = await User.find(query).select("-password")

    if (user.length > 0) {
      return res.status(200).json(user)
    } else {
      return res.status(404).json({ message: "No users found" })
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getMessage = async (req, res) => {
  try {
    const { id: userChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userChatId },
        { senderId: userChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl = null;
    let fileUrl = null;

    // Handle image upload
    if (req.files?.image?.[0]) {
      const imageFile = req.files.image[0];
      imageUrl = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) reject("Image upload failed");
            resolve(result.secure_url);
          }
        ).end(imageFile.buffer);
      });
    }

    // Handle file upload
    if (req.files?.file?.[0]) {
      const fileData = req.files.file[0];
      fileUrl = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) reject("File upload failed");
            resolve(result.secure_url);
          }
        ).end(fileData.buffer);
      });
    }

    // Save message in database
    const newMessage = await Message.create({
      senderId,
      receiverId,
      text: text || "", // Ensure text is not undefined
      image: imageUrl,
      file: fileUrl,
    });

    // Emit real-time message if receiver is online
    const receiverSocketId = getReceiverSocketID(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json({ newMessage, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Middleware to handle file uploads
export const uploadMiddleware = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "file", maxCount: 1 },
]);