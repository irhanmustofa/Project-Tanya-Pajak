import express from "express";
import keluargaController from "./keluarga-client.controller.js";

const keluargaRouter = express.Router();
keluargaRouter.post("/delete", keluargaController.deleteSome);
keluargaRouter
  .route("/")
  .get(keluargaController.all)
  .post(keluargaController.create);
keluargaRouter
  .route("/:id")
  .put(keluargaController.update)
  .delete(keluargaController.remove);

export default keluargaRouter;
