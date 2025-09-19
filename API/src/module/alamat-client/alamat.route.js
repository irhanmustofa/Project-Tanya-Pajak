import express from "express";
import alamatController from "./alamat.controller.js";

const alamatRouter = express.Router();

alamatRouter.post("/delete", alamatController.deleteSome);
alamatRouter.route("/").post(alamatController.create);
alamatRouter
  .route("/:id")
  .put(alamatController.update)
  .delete(alamatController.remove);

export default alamatRouter;
