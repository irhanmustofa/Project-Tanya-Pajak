import express from "express";
import Controller from "./document.controller.js";
import { checkPermission } from "../../utils/middleware.js";

const documentRouter = express.Router();

documentRouter.route("/delete").post(Controller.deleteSome);
documentRouter.route("/").get(Controller.getAll).post(Controller.create);
documentRouter
    .route("/:id")
    .put(Controller.update)
    .delete(Controller.remove);

export default documentRouter;
