const { Router } = require("express");
const { booksController } = require("../controllers/booksController");

const booksRouter = new Router();

booksRouter.get("/", booksController.getAllBooks);
booksRouter.get("/:title", booksController.searchBookByTitle);
// booksRouter.get("/genre/:genre", booksController.getRecommendedBooks);

booksRouter.post("/request", booksController.requestBook);
booksRouter.post("/", booksController.addBook);

module.exports = { booksRouter };
