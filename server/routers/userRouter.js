const { Router } = require("express");
const { userController } = require("../controllers/userController");

const userRouter = new Router();

userRouter.get("/donations", userController.getBooksDonatedByUser);
userRouter.get("/requests", userController.getBooksRequestedByUser);
userRouter.get("/userDetails", userController.getUserDetails);
userRouter.post("/save-token", userController.saveFCMToken);

module.exports = { userRouter };
