import express from "express";
import Controller from "./pajak-keluaran.controller.js";
import { checkPermission } from "../../../utils/middleware.js";

const pajakKeluaranRouter = express.Router();

pajakKeluaranRouter.route("/import").post(checkPermission("pajak-keluaran.import"), Controller.bulkImport);
pajakKeluaranRouter.route("/delete").post(checkPermission("pajak-keluaran.delete"), Controller.deleteSome);
pajakKeluaranRouter.route("/").get(checkPermission("pajak-keluaran.read"), Controller.getAll).post(checkPermission("pajak-keluaran.create"), Controller.create);
pajakKeluaranRouter
    .route("/:id")
    .put(checkPermission("pajak-keluaran.update"), Controller.update)
    .delete(checkPermission("pajak-keluaran.delete"), Controller.remove);

export default pajakKeluaranRouter;
