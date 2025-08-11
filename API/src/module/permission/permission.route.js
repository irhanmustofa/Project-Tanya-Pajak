import express from "express";
import controller from "./permission.controller.js";

const permissionRouter = express.Router();

permissionRouter.route("/").post(controller.createPermission).get(controller.getAllPermissions);

export default permissionRouter;
