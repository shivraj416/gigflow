import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "./services/api";
import { setUser } from "./app/authSlice";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import GigDetails from "./pages/GigDetails";
import CreateGig from "./pages/CreateGig";
import ForgotPassword from "./pages/ForgotPassword";
import Account from "./pages/Account";

export default function App() {
    const dispatch = useDispatch();

    // 🔐 Restore login after refresh
    useEffect(() => {
        const controller = new AbortController();

        const fetchMe = async () => {
            try {
                const res = await api.get("/auth/me", {
                    signal: controller.signal
                });
                dispatch(setUser(res.data));
            } catch {
                // ✅ 401 here is NORMAL if user is not logged in
            }
        };

        fetchMe();
        return () => controller.abort();
    }, [dispatch]);

    return (
        <>
            <nav className="navbar">
                <Link to="/">Dashboard</Link>
                <Link to="/create-gig">Post Gig</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/account">My Account</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/gig/:id" element={<GigDetails />} />
                <Route path="/create-gig" element={<CreateGig />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/account" element={<Account />} />
            </Routes>
        </>
    );
}
