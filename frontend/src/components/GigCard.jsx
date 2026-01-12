import { Link } from "react-router-dom";

export default function GigCard({ gig }) {
  return (
    <div className="card">
      <h3>{gig.title}</h3>
      <p>{gig.description}</p>
      <p>Budget: ₹{gig.budget}</p>
      <Link to={`/gig/${gig._id}`}>View</Link>
    </div>
  );
}
