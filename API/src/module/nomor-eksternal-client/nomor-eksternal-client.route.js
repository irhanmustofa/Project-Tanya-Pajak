import express from "express";
import nomorEksternalController from "./nomor-eksternal-client.controller.js";

const nomorEksternalRouter = express.Router();
nomorEksternalRouter.post("/delete", nomorEksternalController.deleteSome);
nomorEksternalRouter
  .route("/")
  .get(nomorEksternalController.all)
  .post(nomorEksternalController.create);
nomorEksternalRouter
  .route("/:id")
  .put(nomorEksternalController.update)
  .delete(nomorEksternalController.remove);

export default nomorEksternalRouter;
