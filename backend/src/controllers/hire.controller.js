import mongoose from "mongoose";
import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";

export const hireBid = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bid = await Bid.findById(req.params.bidId).session(session);
    if (!bid) {
      throw new Error("Bid not found");
    }

    const gig = await Gig.findById(bid.gigId).session(session);
    if (!gig) {
      throw new Error("Gig not found");
    }

    // 🔐 Prevent double hiring
    if (gig.status === "assigned") {
      throw new Error("Gig already assigned");
    }

    // 👑 Only owner can hire
    if (gig.ownerId.toString() !== req.user.id) {
      throw new Error("Not authorized to hire");
    }

    // Update gig
    await Gig.updateOne(
      { _id: gig._id },
      { status: "assigned" },
      { session }
    );

    // Update selected bid
    await Bid.updateOne(
      { _id: bid._id },
      { status: "hired" },
      { session }
    );

    // Reject all other bids
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { status: "rejected" },
      { session }
    );

    // ✅ Commit ONCE
    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Freelancer hired successfully" });
  } catch (err) {
    // ✅ Abort ONLY if not committed
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({
      message: err.message
    });
  }
};
