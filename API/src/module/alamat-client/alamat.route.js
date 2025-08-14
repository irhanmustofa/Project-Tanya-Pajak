import express from "express";
import ClientController from "./alamat.controller.js";

const alamatRouter = express.Router();

alamatRouter.post("/delete", ClientController.deleteSome);

alamatRouter.route("/").post(ClientController.create);

alamatRouter
  .route("/:id")
  .get(ClientController.getById)
  .put(ClientController.update)
  .delete(ClientController.remove);

export default alamatRouter;
