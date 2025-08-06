import express from "express";
import controller from "./register.controller.js";

const registerRouter = express.Router();

registerRouter.route("/").post(controller.registration);
registerRouter.route("/verify/:token").get(controller.verification);

export default registerRouter;
