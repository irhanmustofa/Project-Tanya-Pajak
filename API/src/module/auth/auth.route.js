import express from "express";
import controller from "./auth.controller.js";

const authRouter = express.Router();

authRouter.get("/authorization", controller.authorization);
authRouter.post("/authentication", controller.authentication);
authRouter.post("/logout", controller.logout);
authRouter.post("/login", controller.login);
authRouter.post("/forgot", controller.forgot);
authRouter.put("/:token", controller.resetPassword);

export default authRouter;
