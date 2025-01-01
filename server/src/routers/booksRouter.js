const { Router } = require("express");
const { booksController } = require("../controllers/booksController");

const booksRouter = new Router();

booksRouter.get("/", booksController.getAllBooks);

booksRouter.post("/", booksController.addBook);

module.exports = { booksRouter };
