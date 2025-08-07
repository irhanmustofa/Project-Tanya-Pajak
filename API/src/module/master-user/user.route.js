import express from "express";
import userController from "./user.controller.js";
import { checkPermission } from "../../utils/middleware.js";

const userRouter = express.Router();

userRouter.route("/delete").post(userController.deleteSome);
userRouter
  .route("/")
  .get(checkPermission("users.read"), userController.getAll)
  .post(checkPermission("users.create"), userController.create);
userRouter
  .route("/:id")
  .put(checkPermission("users.update"), userController.update)
  .delete(userController.remove);

export default userRouter;
