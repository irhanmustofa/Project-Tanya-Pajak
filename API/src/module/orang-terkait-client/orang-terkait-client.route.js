import express from "express";
import orangTerkaitController from "./orang-terkait-client.controller.js";

const orangTerkaitRouter = express.Router();
orangTerkaitRouter.post("/delete", orangTerkaitController.deleteSome);
orangTerkaitRouter.route("/").post(orangTerkaitController.create);
orangTerkaitRouter
  .route("/:id")
  .put(orangTerkaitController.update)
  .delete(orangTerkaitController.remove);

export default orangTerkaitRouter;
