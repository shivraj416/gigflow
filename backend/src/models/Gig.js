import mongoose from "mongoose";

const gigSchema = new mongoose.Schema({
  title: String,
  description: String,
  budget: Number,
  ownerId: mongoose.Schema.Types.ObjectId,
  status: { type: String, enum: ["open", "assigned"], default: "open" }
});

export default mongoose.model("Gig", gigSchema);
