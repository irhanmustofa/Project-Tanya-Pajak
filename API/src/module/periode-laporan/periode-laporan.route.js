import express from "express";
import PeriodeLaporanController from "./periode-laporan.controller.js";

const PeriodeLaporanRouter = express.Router();

PeriodeLaporanRouter.post("/delete", PeriodeLaporanController.deleteSome);

PeriodeLaporanRouter.route("/")
  .get(PeriodeLaporanController.all)
  .post(PeriodeLaporanController.create);

PeriodeLaporanRouter.route("/:id")
  .get(PeriodeLaporanController.getById)
  .put(PeriodeLaporanController.update)
  .delete(PeriodeLaporanController.remove);

export default PeriodeLaporanRouter;
