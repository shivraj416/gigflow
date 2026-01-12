import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import Toast from "../components/Toast";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
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
            await api.post("/auth/register", form);

            // 🔔 SUCCESS TOAST
            setToast({
                message: "Account created successfully 🎉",
                type: "success"
            });

            // small delay so user sees toast
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err) {
            setError("Registration failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            {/* 🔔 Toast */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            <div className="auth-card">
                <h2>Create Account</h2>
                <p className="subtitle">Join GigFlow and start working</p>

                {error && <div className="error-box">{error}</div>}

                <form onSubmit={submit}>
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                        required
                    />

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

                    {/* Password Field with Eye Icon */}
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
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
                        {loading ? "Creating account..." : "Register"}
                    </button>
                </form>

                <p className="footer-text">
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}
