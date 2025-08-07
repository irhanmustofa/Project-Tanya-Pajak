import BukuService from "../../services/buku/buku.service.js";
import JurnalService from "../../services/jurnal/jurnal.service.js";
import Response, { success, badRequest } from "../../app/response.js";
import { generateId } from "../../utils/functions.js";
import { bukuCollections } from "../../services/buku/buku.collections.js";
import templateJurnal from "../../services/jurnal/jurnal.template.js";

const collection = bukuCollections.jurnal_umum;

const getAllBuku = async (req, res) => {
  return Response(
    res,
    await new BukuService(req.headers.clientid, collection).all()
  );
};

const getBukuById = async (req, res) => {
  return Response(
    res,
    await new BukuService(req.headers.clientid, collection).getById(
      req.params.id
    )
  );
};

const getAllJurnal = async (req, res) => {
  return Response(
    res,
    await new JurnalService(req.headers.clientid, collection).all()
  );
};

const getJurnalById = async (req, res) => {
  return Response(
    res,
    await new JurnalService(req.headers.clientid, collection).getByBukuId(
      req.params.id
    )
  );
};

const create = async (req, res) => {
  const clientId = req.headers.clientid;
  const bukuService = new BukuService(clientId, collection);
  const jurnalService = new JurnalService(clientId, collection);

  const _id = generateId();
  const data = req.body;

  const createBuku = await bukuService.create({ _id, ...data });
  if (!createBuku.success) return Response(res, createBuku);

  const jurnalEntries = templateJurnal({
    buku: "JURNAL UMUM",
    buku_id: _id,
    ...data,
  });

  const result = await jurnalService.bulkCreate(jurnalEntries);
  if (!result.success) return Response(res, result);

  return Response(res, success());
};

const upload = async (req, res) => {
  const dataArray = req.body;


  if (!Array.isArray(dataArray)) {
    return Response(res, badRequest({ message: "Expected an array of data." }));
  }

  const clientId = req.headers.clientid;
  const bukuService = new BukuService(clientId, collection);
  const jurnalService = new JurnalService(clientId, collection);

  const bukuEntries = [];
  const jurnalEntries = [];

  for (const item of dataArray) {
    const _id = generateId();
    bukuEntries.push({
      _id,
      ...item,
      akun_debet_1: String(item.akun_debet_1),
      akun_credit_1: String(item.akun_credit_1),
    });

    const arrayJurnal = templateJurnal({
      buku: "JURNAL UMUM",
      buku_id: _id,
      ...item,
    });

    jurnalEntries.push(...arrayJurnal);
  }

  const insertBuku = await bukuService.bulkCreate(bukuEntries);
  if (!insertBuku.success) return Response(res, insertBuku);

  const insertJurnal = await jurnalService.bulkCreate(jurnalEntries);
  if (!insertJurnal.success) return Response(res, insertJurnal);

  return Response(res, success());
};

const update = async (req, res) => {
  const clientId = req.headers.clientid;
  const bukuId = req.params.id;
  const tanggal = new Date(req.body.tanggal);
  const masa = tanggal.getMonth() + 1;
  const tahun = tanggal.getFullYear();

  let data = { ...req.body, masa, tahun };

  const bukuService = new BukuService(clientId, collection);
  const jurnalService = new JurnalService(clientId, collection);

  const updateBuku = await bukuService.update(bukuId, data);
  if (!updateBuku.success) return Response(res, updateBuku);

  const jurnalEntries = templateJurnal({
    buku: "JURNAL UMUM",
    buku_id: bukuId,
    ...data,
  });

  const result = await jurnalService.update(bukuId, jurnalEntries);
  if (!result.success) return Response(res, result);

  return Response(res, success());
};

const remove = async (req, res) => {
  const clientId = req.headers.clientid;
  const bukuId = req.params.id;

  const bukuService = new BukuService(clientId, collection);
  const jurnalService = new JurnalService(clientId, collection);

  const deleteBuku = await bukuService.delete(bukuId);
  if (!deleteBuku.success) return Response(res, deleteBuku);

  const deleteJurnal = await jurnalService.delete(bukuId);
  if (!deleteJurnal.success) return Response(res, deleteJurnal);

  return Response(res, success());
};

const deleteSome = async (req, res) => {
  const clientId = req.headers.clientid;
  const toDelete = req.body;

  if (!Array.isArray(toDelete) || toDelete.length === 0) {
    return Response(
      res,
      badRequest({ message: "Invalid request body. Expected an array of IDs." })
    );
  }

  const bukuService = new BukuService(clientId, collection);
  const jurnalService = new JurnalService(clientId, collection);
  const bukuIds = [];

  toDelete.forEach((id) => {
    const getBuku = bukuService.getById(id);

    if (getBuku.success) {
      bukuIds.push(getBuku.data[0].buku_id);
    }
  });

  const deleteBuku = await bukuService.deleteSome(toDelete);
  if (!deleteBuku.success) return Response(res, deleteBuku);

  const deleteJurnal = await jurnalService.deleteSome(bukuIds);
  if (!deleteJurnal.success) return Response(res, deleteJurnal);

  return Response(res, success());
};

const saldoAwalController = {
  deleteSome,
  upload,
  getAllBuku,
  getAllJurnal,
  getBukuById,
  getJurnalById,
  create,
  update,
  remove,
};

export default saldoAwalController;
