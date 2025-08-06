import express from "express";
import Controller from "./group.controller.js";

const groupRouter = express.Router();

groupRouter.post("/delete", Controller.deleteSome);

groupRouter.route("/")
  .get(Controller.all)
  .post(Controller.create);

groupRouter.route("/:id")
  .get(Controller.getById)
  .put(Controller.update)
  .delete(Controller.remove);

export default groupRouter;
