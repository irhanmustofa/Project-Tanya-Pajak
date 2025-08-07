import Response, { badRequest, notFound, success } from "../../app/response.js";
import Asset from "../../services/asset/asset.entities.js";
import AssetService from "../../services/asset/asset.service.js";
import { parseTanggal } from "../../utils/functions.js";

const all = async (req, res) => {
  const wrapper = new AssetService(req.headers.clientid);
  return Response(res, await wrapper.all());
}

const getById = async (req, res) => {
  const wrapper = new AssetService(req.headers.clientid);
  return Response(res, await wrapper.getByFilter({ _id: req.params.id }));
}

const create = async (req, res) => {
  const wrapper = new AssetService(req.headers.clientid);
  const asset = new Asset(req.body);
  if (asset.errors) {
    return Response(res, badRequest({ message: asset.errors.join(", ") }));
  }
  return Response(res, await wrapper.create(asset));
}

const update = async (req, res) => {
  const wrapper = new AssetService(req.headers.clientid);
  const getData = await wrapper.getByFilter({ _id: req.params.id });
  if (getData.length === 0) {
    return Response(res, notFound({ message: "Group not found" }));
  }

  const data = getData.data[0];
  let newData = { ...data, ...req.body };

  if (req.body.tanggal_perolehan) {
    newData.tanggal_perolehan = parseTanggal(req.body.tanggal_perolehan);
  }

  if (req.body.tanggal_penjualan_aktiva_tetap) {
    newData.tanggal_penjualan_aktiva_tetap = parseTanggal(req.body.tanggal_penjualan_aktiva_tetap);
  }
  if (req.body.tanggal_penyusutan_sebelumnya) {
    newData.tanggal_penyusutan_sebelumnya = parseTanggal(req.body.tanggal_penyusutan_sebelumnya);
  }

  if (newData.errors) {
    return Response(res, badRequest({ message: newData.errors.join(", ") }));
  }

  return Response(res, await wrapper.update(req.params.id, newData));
};

const remove = async (req, res) => {
  const wrapper = new AssetService(req.headers.clientid);
  return Response(res, await wrapper.delete(req.params.id));
}

const deleteSome = async (req, res) => {
  const wrapper = new AssetService(req.headers.clientid);
  const ids = req.body;
  if (!ids || !Array.isArray(ids)) {
    return Response(res, badRequest({ message: "Invalid request body. Expected an array of IDs." }));
  }

  ids.forEach(async (id) => {
    const destroy = await wrapper.delete(id);
    if (!destroy.success) {
      return Response(res, notFound({ message: destroy.message }));
    }
  })

  return Response(res, success());
}

const assetController = {
  all,
  getById,
  create,
  update,
  remove,
  deleteSome
}

export default assetController;
