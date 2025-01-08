const express = require("express");
require("./config/db");
const cors = require("cors");
const { authMiddleware } = require("./middleware/auth");

const app = express();

const { authRouter } = require("./routers/authRouter");
const { booksRouter } = require("./routers/booksRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/books", authMiddleware, booksRouter);

app.get("/", (req, res) => res.send("Hello World!"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
