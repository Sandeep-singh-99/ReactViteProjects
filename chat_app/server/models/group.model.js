import mongoose, { model, Schema } from "mongoose";

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    joinRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    inviteLink: {
      type: String,
      unique: true,
    },
    image: {
      type: String,
      default: "https://example.com/default-group-image.png", 
    }
  },
  { timestamps: true }
);

const Group = model("Group", groupSchema);
export default Group;
