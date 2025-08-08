import express from "express";
import controller from "./user-client.controller.js";

const userClientRouter = express.Router();

userClientRouter.route("/").get(controller.getUserClient);

export default userClientRouter;
