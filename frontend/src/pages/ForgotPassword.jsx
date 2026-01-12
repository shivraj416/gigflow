import { useState } from "react";
import api from "../services/api";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    /* ✅ VERIFY EMAIL */
    const verifyEmail = async () => {
        setLoading(true);
        try {
            await api.post("/auth/forgot-password", { email });

            setToast({
                message: "Your email is verified ✅",
                type: "success"
            });

            setVerified(true);
        } catch {
            setToast({
                message: "Sorry, your email is not verified ❌",
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    /* 🔐 RESET PASSWORD */
    const resetPassword = async () => {
        setLoading(true);
        try {
            await api.post("/auth/reset-password", {
                email,
                newPassword
            });

            setToast({
                message: "Password reset successfully 🎉",
                type: "success"
            });

            setTimeout(() => navigate("/login"), 1500);
        } catch {
            setToast({
                message: "Password reset failed ❌",
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper forgot-bg">
            {/* 🔔 Toast */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            <div className="auth-card">
                <h2>Forgot Password</h2>
                <p className="subtitle">
                    Verify your email to reset your password
                </p>

                {!verified ? (
                    <>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter registered email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <button onClick={verifyEmail} disabled={loading}>
                            {loading ? "Verifying..." : "Verify Email"}
                        </button>
                    </>
                ) : (
                    <>
                        <label>New Password</label>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />

                        <button onClick={resetPassword} disabled={loading}>
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
