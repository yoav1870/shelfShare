const { Router } = require("express");
const { userController } = require("../controllers/userController");

const userRouter = new Router();

userRouter.post("/request", userController.requestBook);
userRouter.get("/donations", userController.getBooksDonatedByUser);
userRouter.get("/requests", userController.getBooksRequestedByUser);

module.exports = { userRouter };