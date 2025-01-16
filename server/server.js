const express = require("express");
require("./config/db");
const cors = require("cors");
const { authMiddleware } = require("./middleware/auth");

const { generateNBooks } = require("./services/googleBooksService");

const app = express();

const { authRouter } = require("./routers/authRouter");
const { booksRouter } = require("./routers/booksRouter");
const { userRouter } = require("./routers/userRouter");
const { reviewRouter } = require("./routers/reviewRouter");

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/books", authMiddleware, booksRouter);
app.use("/api/user", authMiddleware, userRouter);
app.use("/api/review", authMiddleware, reviewRouter);

app.get("/", (req, res) => res.send("Hello World!"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
