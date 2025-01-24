const { Router } = require("express");
const { adminController } = require("../controllers/adminController");

const adminRouter = new Router();

adminRouter.get("/usersData", adminController.getUsersData);
adminRouter.get("/booksData", adminController.getBooksData);
adminRouter.get("/reviewsData", adminController.getReviewsData);
adminRouter.get("/susReviews", adminController.getSuspiciousReviews);

module.exports = { adminRouter };
