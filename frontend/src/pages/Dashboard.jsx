import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import GigCard from "../components/GigCard";
import { logout } from "../app/authSlice";
import Toast from "../components/Toast";

export default function Dashboard() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [toast, setToast] = useState(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    /* 🔐 Auth guard (skip during logout) */
    useEffect(() => {
        if (!user && !isLoggingOut) {
            setToast({
                message: "Please login first to access the dashboard",
                type: "info"
            });

            const timer = setTimeout(() => {
                navigate("/login");
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [user, navigate, isLoggingOut]);

    /* Fetch gigs */
    useEffect(() => {
        const fetchGigs = async () => {
            try {
                const res = await api.get("/gigs");
                setGigs(res.data);
            } catch (err) {
                setError("Failed to load gigs");
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchGigs();
    }, [user]);

    /* 🚪 Logout */
    const handleLogout = async () => {
        setIsLoggingOut(true);

        try {
            await api.post("/auth/logout");
        } catch { }

        dispatch(logout());

        setToast({
            message: "Logged out successfully 👋",
            type: "success"
        });

        setTimeout(() => {
            navigate("/login");
        }, 1500);
    };

    if (!user) {
        return (
            <>
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </>
        );
    }

    return (
        <div className="container">
            {/* 🔔 Toast */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            {/* TOP BAR */}
            <div className="dashboard-top">
                <div>
                    <h1>Welcome, {user.name} 👋</h1>
                    <p>Find work, hire talent, and grow with GigFlow</p>
                </div>

                <div className="user-box">
                    <span className="user-name">👤 {user.name}</span>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>

            {/* HERO BANNER */}
            <div className="dashboard-hero">
                <div className="hero-text">
                    <h2>Discover Freelance Opportunities</h2>
                    <p>
                        Browse gigs, submit bids, or post your own project and hire top talent.
                    </p>
                </div>
            </div>

            {/* STATS */}
            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>{gigs.length}</h3>
                    <p>Open Gigs</p>
                </div>
                <div className="stat-card">
                    <h3>24/7</h3>
                    <p>Active Marketplace</p>
                </div>
                <div className="stat-card">
                    <h3>100%</h3>
                    <p>Secure Payments</p>
                </div>
            </div>

            {/* GIG SECTION */}
            <div className="dashboard-section">
                <h2>Available Gigs</h2>

                {loading && <p className="status-text">Loading gigs...</p>}
                {error && <p className="status-text error">{error}</p>}

                {!loading && gigs.length === 0 && (
                    <div className="empty-state">
                        <h3>No gigs available</h3>
                        <p>Check back later or post a new gig.</p>
                    </div>
                )}

                <div className="gig-list">
                    {gigs.map((g) => (
                        <GigCard key={g._id} gig={g} />
                    ))}
                </div>
            </div>
        </div>
    );
}
