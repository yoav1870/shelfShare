const { Router } = require("express");
const { reviewController } = require("../controllers/reviewController");

const reviewRouter = new Router();

reviewRouter.post("/", reviewController.addReview);
reviewRouter.get("/:bookId", reviewController.getReviewsByBook);
reviewRouter.put("/:reviewId", reviewController.updateReview);
reviewRouter.delete("/:reviewId", reviewController.deleteReview);

module.exports = { reviewRouter };
