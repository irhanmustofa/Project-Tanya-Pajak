import express from "express";
import groupController from "./group.controller.js";

const groupRouter = express.Router();

groupRouter.route("/delete").post(groupController.deleteSome);
groupRouter.route("/import").post(groupController.upload);

groupRouter.route("/").get(groupController.all).post(groupController.create);

groupRouter
  .route("/:id")
  .get(groupController.getById)
  .put(groupController.update)
  .delete(groupController.remove);

export default groupRouter;
