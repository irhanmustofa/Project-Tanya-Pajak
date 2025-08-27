import express from "express";
import clientController from "./client.controller.js";

const clientRouter = express.Router();
clientRouter.post("/delete", clientController.deleteSome);
clientRouter.route("/").get(clientController.all).post(clientController.create);
clientRouter
  .route("/:id")
  .get(clientController.getById)
  .put(clientController.update)
  .delete(clientController.remove);

export default clientRouter;
