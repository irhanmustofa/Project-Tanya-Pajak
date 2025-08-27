import express from "express";
import tkuController from "./tku.controller.js";

const tkuRouter = express.Router();
tkuRouter.post("/delete", tkuController.deleteSome);
tkuRouter.route("/").post(tkuController.create);
tkuRouter.route("/:id").put(tkuController.update).delete(tkuController.remove);

export default tkuRouter;
