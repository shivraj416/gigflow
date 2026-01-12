import { useState } from "react";
import api from "../services/api";
import { useDispatch } from "react-redux";
import { setUser } from "../app/authSlice";
import { useNavigate, Link } from "react-router-dom";
import Toast from "../components/Toast";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [toast, setToast] = useState(null);

    const submit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await api.post("/auth/login", form);
            dispatch(setUser(res.data));

            // 🔔 SUCCESS TOAST
            setToast({
                message: "Login successful 🎉",
                type: "success"
            });

            // small delay so user sees toast
            setTimeout(() => {
                navigate("/");
            }, 1500);
        } catch (err) {
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper login-bg">
            {/* 🔔 Toast */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            <div className="auth-card">
                <h2>Welcome Back</h2>
                <p className="subtitle">Login to continue to GigFlow</p>

                {error && <div className="error-box">{error}</div>}

                <form onSubmit={submit}>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                        required
                    />

                    <label>Password</label>

                    {/* Password with Eye Icon */}
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                            required
                        />

                        <span
                            className="eye-icon"
                            onClick={() => setShowPassword(!showPassword)}
                            title={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </span>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="footer-text">
                    Don’t have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>
                <p className="footer-text">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </p>
            </div>
        </div>
    );
}
