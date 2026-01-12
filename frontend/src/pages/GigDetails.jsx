import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import BidCard from "../components/BidCard";

export default function GigDetails() {
    const { id } = useParams();

    const [bids, setBids] = useState([]);
    const [form, setForm] = useState({
        message: "",
        price: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchBids = async () => {
            try {
                const res = await api.get(`/bids/${id}`);
                setBids(res.data);
            } catch (err) {
                setError("Failed to load bids");
            } finally {
                setLoading(false);
            }
        };

        fetchBids();
    }, [id]);

    const submitBid = async () => {
        if (!form.message || !form.price) return;

        setSubmitting(true);
        try {
            await api.post("/bids", { ...form, gigId: id });
            setForm({ message: "", price: "" });
            const res = await api.get(`/bids/${id}`);
            setBids(res.data);
        } catch (err) {
            alert("Failed to submit bid");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container">
            {/* Page Header */}
            <div className="gig-header">
                <h1>Gig Bids</h1>
                <p>Submit your bid or review existing ones</p>
            </div>

            {/* Bid Form */}
            <div className="bid-form-card">
                <h3>Submit a Bid</h3>

                <textarea
                    placeholder="Write a message to the client"
                    value={form.message}
                    onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                    }
                />

                <input
                    type="number"
                    placeholder="Your price (₹)"
                    value={form.price}
                    onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                    }
                />

                <button onClick={submitBid} disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit Bid"}
                </button>
            </div>

            {/* States */}
            {loading && <p className="status-text">Loading bids...</p>}
            {error && <p className="status-text error">{error}</p>}

            {!loading && bids.length === 0 && (
                <div className="empty-state">
                    <h3>No bids yet</h3>
                    <p>Be the first one to bid on this gig.</p>
                </div>
            )}

            {/* Bids List */}
            <div className="bid-list">
                {bids.map((b) => (
                    <BidCard key={b._id} bid={b} />
                ))}
            </div>
        </div>
    );
}
