import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateGig() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        budget: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.title || !form.description || !form.budget) {
            setError("All fields are required");
            return;
        }

        setLoading(true);
        try {
            await api.post("/gigs", form);
            navigate("/");
        } catch (err) {
            setError("Failed to create gig");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            {/* Page Header */}
            <div className="dashboard-header">
                <h1>Create New Gig</h1>
                <p>Post a job and hire the best freelancer</p>
            </div>

            {/* Image + Form Layout */}
            <div className="create-gig-layout">
                {/* LEFT IMAGE */}
                <div className="create-gig-image">
                    <img
                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                        alt="Freelancing work"
                    />
                    <div className="image-overlay">
                        <h3>Hire Faster 🚀</h3>
                        <p>Post your gig and connect with skilled freelancers</p>
                    </div>
                </div>

                {/* RIGHT FORM */}
                <div className="bid-form-card">
                    {error && <div className="error-box">{error}</div>}

                    <form onSubmit={submit}>
                        <label>Gig Title</label>
                        <input
                            type="text"
                            placeholder="Enter gig title"
                            value={form.title}
                            onChange={(e) =>
                                setForm({ ...form, title: e.target.value })
                            }
                        />

                        <label>Description</label>
                        <textarea
                            placeholder="Describe the job in detail"
                            value={form.description}
                            onChange={(e) =>
                                setForm({ ...form, description: e.target.value })
                            }
                        />

                        <label>Budget (₹)</label>
                        <input
                            type="number"
                            placeholder="Enter budget"
                            value={form.budget}
                            onChange={(e) =>
                                setForm({ ...form, budget: e.target.value })
                            }
                        />

                        <button type="submit" disabled={loading}>
                            {loading ? "Posting..." : "Post Gig"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
