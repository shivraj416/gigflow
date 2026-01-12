import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  gigId: mongoose.Schema.Types.ObjectId,
  freelancerId: mongoose.Schema.Types.ObjectId,
  message: String,
  price: Number,
  status: {
    type: String,
    enum: ["pending", "hired", "rejected"],
    default: "pending"
  }
});

export default mongoose.model("Bid", bidSchema);
