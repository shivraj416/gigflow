import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import gigRoutes from "./routes/gig.routes.js";
import bidRoutes from "./routes/bid.routes.js";

const app = express();

/* ================= MIDDLEWARES ================= */

// Parse JSON first
app.use(express.json());

// Parse cookies (MUST be before routes)
app.use(cookieParser());

// CORS (must allow credentials)
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://gigflow-rho.vercel.app"
        ],
        credentials: true
    })
);

/* ================= TEST ROUTE ================= */

app.get("/", (req, res) => {
    res.send("🚀 Code With Shiva and Backend Successfully Running!!");
});

/* ================= ROUTES ================= */

app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);

export default app;
