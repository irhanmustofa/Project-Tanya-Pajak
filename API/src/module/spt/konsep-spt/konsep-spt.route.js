import express from "express";
import Controller from "./konsep-spt.controller.js";
import { checkPermission } from "../../../utils/middleware.js";

const konsepSptRouter = express.Router();

konsepSptRouter.route("/delete").post(checkPermission("konsep-spt.delete"), Controller.deleteSome);
konsepSptRouter.route("/").get(checkPermission("konsep-spt.read"), Controller.getAll).post(checkPermission("pajak-keluaran.create"), Controller.create);
konsepSptRouter
    .route("/:id")
    .put(checkPermission("konsep-spt.update"), Controller.update)
    .delete(checkPermission("konsep-spt.delete"), Controller.remove);

export default konsepSptRouter;
