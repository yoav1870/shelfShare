const express = require("express");
require("./config/db");

const app = express();

const { authRouter } = require("./routers/authRouter");
const { booksRouter } = require("./routers/booksRouter");

app.use(express.json());

app.use("/auth", authRouter);
app.use("/books", booksRouter);

app.get("/", (req, res) => res.send("Hello World!"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
