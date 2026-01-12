import api from "../services/api";

export default function BidCard({ bid }) {
  const hire = async () => {
    await api.patch(`/bids/${bid._id}/hire`);
    window.location.reload();
  };

  return (
    <div className="card">
      <p>{bid.message}</p>
      <p>₹{bid.price}</p>
      <p>Status: {bid.status}</p>

      {bid.status === "pending" && (
        <button onClick={hire}>Hire</button>
      )}
    </div>
  );
}
