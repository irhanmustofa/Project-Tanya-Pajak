import MongodbWrapper from "../../../../database/mongo/mongo.wrapper.js";
import { masterCoaSchema } from "../master.schema.js";
import MasterCoa from "../master.entities.js";
import { badRequest } from "../../../../app/response.js";

export default async function importMasterCoa(req) {
  var coaArr = [],
    kodeAkunArr = [];
  var input = {},
    abort = 0;

  const clientId = req.headers.clientid;
  const wrapper = new MongodbWrapper(masterCoaSchema(clientId));

  let getDataId = await wrapper.all();

  if (getDataId.success) {
    kodeAkunArr = getDataId.data.map((item) => item.kode_akun);
  }

  for (let m = 0; m < req.body.length; m++) {
    input = {
      nama_akun: req.body[m].nama_akun,
      kode_akun: req.body[m].kode_akun,
      kode_head: String(req.body[m].kode_head),
      kode_group: String(req.body[m].kode_group),
      jenis_asset: req.body[m].jenis_asset,
      klasifikasi_pajak: String(req.body[m].klasifikasi_pajak),
      pph: req.body[m].pph,
      laba_kotor: req.body[m].laba_kotor,
      ebt: req.body[m].ebt,
      arus_bank: req.body[m].arus_bank,
      cf: req.body[m].cf,
    };
    console.log("in:", input);

    if (kodeAkunArr.indexOf(req.body[m].kode_akun) > -1) {
      console.log("kodeAkun:", req.body[m].kode_akun);
      console.log("check:", kodeAkunArr.indexOf(req.body[m].kode_akun));
      abort = 1;
      break;
    }

    let masterCoa = new MasterCoa(input);
    if (masterCoa.errors) {
      return badRequest({ message: masterCoa.errors.join(", ") });
    }
    coaArr.push(masterCoa);
  }

  if (abort) {
    return {
      success: false,
      message: "terdapat kode akun yang sudah pernah diinputkan",
    };
  }

  return await wrapper.bulkCreate(coaArr);
}
