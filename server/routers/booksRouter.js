const { Router } = require("express");
const { booksController } = require("../controllers/booksController");

const booksRouter = new Router();

booksRouter.get("/liked", booksController.getLikedBooks);
booksRouter.get("/recommended", booksController.getRecommendedBooks);
booksRouter.get("/category/:category", booksController.searchBookByCategory);
booksRouter.get("/:title", booksController.searchBookByTitle);
booksRouter.get("/", booksController.getAllBooks);

booksRouter.put("/like/:bookId", booksController.likeBook);
booksRouter.put("/unlike/:bookId", booksController.unlikeBook);
booksRouter.post("/request", booksController.requestBook);
booksRouter.post("/", booksController.addBook);

module.exports = { booksRouter };
