import { v4 as uuidv4 } from "uuid";
import Group from "../models/group.model.js";
import GroupMessage from "../models/group-message.models.js";
import cloudinary from "../lib/cloudinary.js";

import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const uploadMiddleware = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "file", maxCount: 1 },
]);

export const createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const admin = req.user._id;
    const inviteLink = uuidv4();

    const group = await Group.create({
      name,
      admin,
      members: [admin],
      inviteLink,
    });

    res.status(201).send({ message: "Group created successfully", group });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const uploadGroupImage = async (req, res) => {
  try {
    const { groupId } = req.params;
    const adminId = req.user._id;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    // Check if the user is the group admin
    if (group.admin.toString() !== adminId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    let imageUrl = null;
    try {
      imageUrl = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "image" }, (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          })
          .end(req.file.buffer);
      });
    } catch (uploadError) {
      return res.status(500).json({ message: "Image upload failed" });
    }

    group.image = imageUrl;
    await group.save();

    res.status(200).json({ message: "Group image uploaded successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const joinGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user._id;

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).send({ message: "Group not found" });
    }

    if (group.members.includes(userId)) {
      return res
        .status(400)
        .send({ message: "You are already a member of this group" });
    }

    if (group.joinRequests.includes(userId) || group.members.includes(userId)) {
      return res.status(400).send({ message: "Already requested or a member" });
    }

    if (!group.joinRequests.includes(userId)) {
      group.joinRequests.push(userId);
      await group.save();
    }

    res.status(200).send({ message: "Request sent" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const approveRequest = async (req, res) => {
  try {
    const { groupId, userId } = req.params;
    const group = await Group.findById(groupId);
    if (!group || group.admin.toString() !== req.user._id.toString()) {
      return res.status(404).send({ message: "Not authorized" });
    }

    group.members.push(userId);
    group.joinRequests = group.joinRequests.filter(
      (id) => id.toString() !== userId.toString()
    );
    await group.save();

    res.status(200).send({ message: "User added to Group" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const removeMember = async (req, res) => {
  try {
    const { groupId, userId } = req.params;
    const group = await Group.findById(groupId);

    if (!group || group.admin.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    group.members = group.members.filter((id) => id.toString() !== userId);
    await group.save();

    res.status(200).json({ message: "User removed from group" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const joinGroupByInviteLink = async (req, res) => {
  try {
    const { inviteLink } = req.params;
    const userId = req.user._id;

    const group = await Group.findOne({ inviteLink });
    if (!group) return res.status(404).json({ message: "Invalid invite link" });

    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();
    }

    res.status(200).json({ message: "Joined group successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getGroup = async (req, res) => {
  try {
    const group = await Group.find().populate(
      "admin members",
      "fullName email profilePic"
    );

    if (!group) return res.status(404).json({ message: "Group not found" });

    res.status(200).json(group);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const groupDelete = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);

    if (!group || group.admin.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await GroupMessage.deleteMany({ groupId });
    await Group.findByIdAndDelete(groupId);

    res
      .status(200)
      .json({ message: "Group and all related messages deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
