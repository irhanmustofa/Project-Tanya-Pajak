import express from "express";
import userController from "./user.controller.js";

const userRouter = express.Router();

userRouter.route("/delete").post(userController.deleteSome);
userRouter.route("/").get(userController.getAll).post(userController.create);
userRouter
  .route("/:id")
  .put(userController.update)
  .delete(userController.remove);

export default userRouter;
