import { useSelector } from "react-redux";

export default function Account() {
    const user = useSelector((state) => state.auth.user);

    if (!user) return null;

    return (
        <div className="account-bg">
            <div className="account-overlay">
                <div className="account-container">
                    <div className="account-header">
                        <h1>Account Information</h1>
                        <p>Manage your personal details securely</p>
                    </div>

                    <div className="account-card">
                        <div className="account-row">
                            <span className="label">👤 Name</span>
                            <span className="value">{user.name}</span>
                        </div>

                        <div className="account-row">
                            <span className="label">📧 Email</span>
                            <span className="value">{user.email}</span>
                        </div>

                        <div className="account-row">
                            <span className="label">🔒 Password</span>
                            <span className="value">••••••••</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
