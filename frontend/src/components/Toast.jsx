import { useEffect } from "react";

export default function Toast({ message, type = "info", onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2500); // auto close in 2.5s

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`toast toast-${type}`}>
            {message}
        </div>
    );
}
