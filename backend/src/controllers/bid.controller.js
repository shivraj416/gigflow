import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";

export const createBid = async (req, res) => {
  const gig = await Gig.findById(req.body.gigId);
  if (!gig || gig.status !== "open") {
    return res.status(400).json({ message: "Gig not open" });
  }

  const bid = await Bid.create({
    gigId: req.body.gigId,
    freelancerId: req.user.id,
    message: req.body.message,
    price: req.body.price
  });

  res.json(bid);
};

export const getBidsByGig = async (req, res) => {
  const bids = await Bid.find({ gigId: req.params.gigId });
  res.json(bids);
};
