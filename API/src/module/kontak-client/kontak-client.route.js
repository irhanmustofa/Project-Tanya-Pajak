import express from "express";
import kontakController from "./kontak-client.controller.js";

const kontakRouter = express.Router();
kontakRouter.post("/delete", kontakController.deleteSome);
kontakRouter.route("/").post(kontakController.create);
kontakRouter
  .route("/:id")
  .put(kontakController.update)
  .delete(kontakController.remove);

export default kontakRouter;
