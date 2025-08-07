import express from "express";
import AssetSettingController from "./asset.setting.controller.js";

const assetSettingRoute = express.Router();
assetSettingRoute.get("/jenis", AssetSettingController.getJenisAsset);
assetSettingRoute.get("/kategori", AssetSettingController.getKategoriAsset);
assetSettingRoute.get("/golongan", AssetSettingController.getGolonganAsset);
assetSettingRoute.get("/metode", AssetSettingController.getMetodePenyusutan);
assetSettingRoute.get("/jenis-harta", AssetSettingController.getJenisHarta);

export default assetSettingRoute;
