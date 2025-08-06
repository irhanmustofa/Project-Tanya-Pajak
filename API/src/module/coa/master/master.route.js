import express from "express";
import coaController from "./master.controller.js";

const coaRouter = express.Router();

coaRouter.route("/delete").post(coaController.deleteSome);
coaRouter.route("/import").post(coaController.upload);

coaRouter.route("/").get(coaController.all).post(coaController.create);

coaRouter
  .route("/:id")
  .get(coaController.getById)
  .put(coaController.update)
  .delete(coaController.remove);

export default coaRouter;
