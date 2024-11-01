import mongoose from "mongoose";

const ChatHistorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    chatOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
    message: [
      {
        sender: { type: String, enum: ["user", "Purr-fessor"] },
        text: { type: String },
        image: { type: String },
        audio: { type: String },
        video: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const ChatHistoryModel =
  mongoose.models.ChatHistory ||
  mongoose.model("ChatHistory", ChatHistorySchema);
