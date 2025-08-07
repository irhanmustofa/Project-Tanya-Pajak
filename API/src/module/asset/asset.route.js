import express from "express";
import assetSettingRoute from "../../services/asset/asset-setting/asset.setting.route.js";
import assetController from "./asset.controller.js";

const assetRouter = express.Router();

assetRouter.use("/setting", assetSettingRoute);

assetRouter.post("/delete", assetController.deleteSome);

assetRouter.route("/")
  .get(assetController.all)
  .post(assetController.create);

assetRouter.route("/:id")
  .get(assetController.getById)
  .put(assetController.update)
  .delete(assetController.remove);


export default assetRouter;