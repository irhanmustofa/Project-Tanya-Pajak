import express from "express";
import bankController from "./bank-client.controller.js";

const bankRouter = express.Router();
bankRouter.post("/delete", bankController.deleteSome);
bankRouter.route("/").get(bankController.all).post(bankController.create);
bankRouter
  .route("/:id")
  .put(bankController.update)
  .delete(bankController.remove);

export default bankRouter;
