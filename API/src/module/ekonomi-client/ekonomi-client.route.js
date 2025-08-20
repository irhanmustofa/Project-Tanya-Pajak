import ekonomiClientController from "./ekonomi-client.controller.js";
import express from "express";

const ekonomiClientRouter = express.Router();
ekonomiClientRouter.put("/:id", ekonomiClientController.update);

export default ekonomiClientRouter;
