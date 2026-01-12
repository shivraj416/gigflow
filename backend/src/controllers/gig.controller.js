import Gig from "../models/Gig.js";

export const getGigs = async (req, res) => {
  const q = req.query.q || "";
  const gigs = await Gig.find({
    status: "open",
    title: { $regex: q, $options: "i" }
  });
  res.json(gigs);
};

export const createGig = async (req, res) => {
  const gig = await Gig.create({
    ...req.body,
    ownerId: req.user.id
  });
  res.json(gig);
};
