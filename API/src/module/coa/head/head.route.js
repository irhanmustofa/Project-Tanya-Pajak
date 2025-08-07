import express from "express";
import headController from "./head.controller.js";

const headRouter = express.Router();

headRouter.route("/delete").post(headController.deleteSome);
headRouter.route("/import").post(headController.upload);

headRouter.route("/").get(headController.all).post(headController.create);

headRouter
  .route("/:id")
  .get(headController.getById)
  .put(headController.update)
  .delete(headController.remove);

export default headRouter;
