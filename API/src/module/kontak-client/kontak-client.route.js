import express from "express";
import kontakClientController from "./kontak-client.controller.js";

const kontakClientRouter = express.Router();
kontakClientRouter.post("/delete", kontakClientController.deleteSome);
kontakClientRouter.route("/").post(kontakClientController.create);
kontakClientRouter
  .route("/:id")
  .put(kontakClientController.update)
  .delete(kontakClientController.remove);

export default kontakClientRouter;
