import assetSetting from "./asset.setting.data.js";

const getJenisAsset = (req, res) => {
  res.json({
    success: true,
    data: assetSetting.jenisAsset,
  });
};

const getKategoriAsset = (req, res) => {
  res.json({
    success: true,
    data: assetSetting.kategoriAsset,
  });
};

const getGolonganAsset = (req, res) => {
  res.json({
    success: true,
    data: assetSetting.golonganAsset,
  });
};

const getMetodePenyusutan = (req, res) => {
  res.json({
    success: true,
    data: assetSetting.metodePenyusutan,
  });
};

const getJenisHarta = (req, res) => {
  res.json({
    success: true,
    data: assetSetting.jenisHarta
  });
};

const assetSettingController = {
  getJenisAsset,
  getKategoriAsset,
  getGolonganAsset,
  getMetodePenyusutan,
  getJenisHarta
};

export default assetSettingController;
