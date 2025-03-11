import mongoose ,{ model, Schema } from "mongoose";

const groupMessageSchema = new Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    file: {
      type: String,
    },
  },
  { timestamps: true }
);

const GroupMessage = model("GroupMessage", groupMessageSchema);
export default GroupMessage;
