const express = require("express");
require("./config/db");
const cors = require("cors");
const { authMiddleware } = require("./middleware/auth");
const app = express();

const { authRouter } = require("./routers/authRouter");
const { booksRouter } = require("./routers/booksRouter");
const { userRouter } = require("./routers/userRouter");
const { reviewRouter } = require("./routers/reviewRouter");
const { adminRouter } = require("./routers/adminRouter");

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/books", authMiddleware, booksRouter);
app.use("/api/user", authMiddleware, userRouter);
app.use("/api/review", authMiddleware, reviewRouter);
app.use("/api/admin", authMiddleware, adminRouter);
app.get("/firebase-config", (req, res) => {
  res.json({
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
    vapidKey: process.env.VITE_FIREBASE_VAPID_KEY,
  });
});

app.get("/", (req, res) => res.send("Hello World!"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
