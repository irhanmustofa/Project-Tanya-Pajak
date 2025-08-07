import express from "express";
import controller from "./saldo.awal.controller.js";

const router = express.Router();

router.post("/delete", controller.deleteSome);
router.post("/import", controller.upload);
router.get("/buku", controller.getAllBuku);
router.get("/jurnal", controller.getAllJurnal);
router.route("/buku/:id").get(controller.getBukuById);
router.route("/jurnal/:id").get(controller.getJurnalById);
router.post("/", controller.create);
router.route("/:id").put(controller.update).delete(controller.remove);

export default router;
