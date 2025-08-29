import express from "express";
import Controller from "./document.controller.js";
import { checkPermission } from "../../utils/middleware.js";

const documentRouter = express.Router();

documentRouter.route("/delete").post(checkPermission("documents.delete"), Controller.deleteSome);
documentRouter.route("/").get(checkPermission("documents.read"), Controller.getAll).post(checkPermission("documents.create"), Controller.create);
documentRouter
    .route("/:id")
    .put(checkPermission("documents.update"), Controller.update)
    .delete(checkPermission("documents.delete"), Controller.remove);

export default documentRouter;
