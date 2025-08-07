import express from "express";
import masterRouter from "./master/master.route.js";
import headRouter from "./head/head.route.js";
import groupRouter from "./group/group.route.js";

const route = express.Router();

route.use("/master", masterRouter);
route.use("/head", headRouter);
route.use("/group", groupRouter);

export default route;
