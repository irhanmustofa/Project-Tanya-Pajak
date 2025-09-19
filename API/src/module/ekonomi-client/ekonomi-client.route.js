import express from "express";
import ekonomiController from "./ekonomi-client.controller.js";

const ekonomiRouter = express.Router();
ekonomiRouter.put("/:id", ekonomiController.update);

export default ekonomiRouter;
