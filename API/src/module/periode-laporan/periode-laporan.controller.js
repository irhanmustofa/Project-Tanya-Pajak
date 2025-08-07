import Response, { badRequest } from "../../app/response.js";
import MongodbWrapper from "../../database/mongo/mongo.wrapper.js";
import { periodeLaporanSchema } from "./periode-laporan.schema.js";
import PeriodeLaporan from "./periode-laporan.entities.js";
import { moveFile } from "../../utils/uploadHandler.js";

const wrapper = (client_id) =>
  new MongodbWrapper(periodeLaporanSchema(client_id));

const all = async (req, res) => {
  return Response(res, await wrapper(req.headers.clientid).all());
};

const getById = async (req, res) => {
  return Response(
    res,
    await wrapper(req.headers.clientid).getByFilter({ _id: req.params.id })
  );
};

const create = async (req, res) => {
  const input = { ...req.body };

  if (req.files?.file_spt_sebelumnya) {
    const newName = `SptSebelumnya-${input.tahun_buku}`;
    const folder = "document-spt";

    const fileResult = await moveFile(
      req.files.file_spt_sebelumnya,
      newName,
      folder,
      [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      2
    );

    if (!fileResult.status) {
      return Response(
        res,
        error({
          message: fileResult.message || "File SPT Sebelumnya upload failed",
        })
      );
    } else {
      input.file_spt_sebelumnya = `/${fileResult.path}`;
    }
  }

  if (req.files?.file_spt_berjalan) {
    const newName = `SptBerjalan-${input.tahun_buku}}`;
    const folder = "document-spt";

    const fileResult = await moveFile(
      req.files.file_spt_berjalan,
      newName,
      folder,
      [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      2
    );

    if (!fileResult.status) {
      return Response(
        res,
        error({
          message: fileResult.message || "File SPT Berjalan upload failed",
        })
      );
    } else {
      input.file_spt_berjalan = `/${fileResult.path}`;
    }
  }

  if (req.files?.file_spt_berikutnya) {
    const newName = `SptBerikutnya-${input.tahun_buku}}`;
    const folder = "document-spt";

    const fileResult = await moveFile(
      req.files.file_spt_berikutnya,
      newName,
      folder,
      [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      2
    );

    if (!fileResult.status) {
      return Response(
        res,
        error({
          message: fileResult.message || "File SPT Berikutnya upload failed",
        })
      );
    } else {
      input.file_spt_berikutnya = `/${fileResult.path}`;
    }
  }

  const periodeLaporan = new PeriodeLaporan(input);

  if (periodeLaporan.errors) {
    return Response(
      res,
      badRequest({ message: periodeLaporan.errors.join(", ") })
    );
  }

  return Response(
    res,
    await wrapper(req.headers.clientid).create(periodeLaporan)
  );
};

const update = async (req, res) => {
  const input = { ...req.body };

  if (req.files?.file_spt_sebelumnya) {
    const newName = `SptSebelumnya-${input.tahun_buku}`;
    const folder = "document-spt";

    const fileResult = await moveFile(
      req.files.file_spt_sebelumnya,
      newName,
      folder,
      [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      2
    );

    if (!fileResult.status) {
      return Response(
        res,
        error({
          message: fileResult.message || "File SPT Sebelumnya upload failed",
        })
      );
    } else {
      input.file_spt_sebelumnya = `/${fileResult.path}`;
    }
  }

  if (req.files?.file_spt_berjalan) {
    const newName = `SptBerjalan-${input.tahun_buku}`;
    const folder = "document-spt";

    const fileResult = await moveFile(
      req.files.file_spt_berjalan,
      newName,
      folder,
      [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      2
    );

    if (!fileResult.status) {
      return Response(
        res,
        error({
          message: fileResult.message || "File SPT Berjalan upload failed",
        })
      );
    } else {
      input.file_spt_berjalan = `/${fileResult.path}`;
    }
  }

  if (req.files?.file_spt_berikutnya) {
    const newName = `SptBerikutnya-${input.tahun_buku}`;
    const folder = "document-spt";

    const fileResult = await moveFile(
      req.files.file_spt_berikutnya,
      newName,
      folder,
      [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      2
    );

    if (!fileResult.status) {
      return Response(
        res,
        error({
          message: fileResult.message || "File SPT Berikutnya upload failed",
        })
      );
    } else {
      input.file_spt_berikutnya = `/${fileResult.path}`;
    }
  }

  const periodeLaporan = new PeriodeLaporan(input);
  if (periodeLaporan.errors) {
    return Response(
      res,
      badRequest({ message: periodeLaporan.errors.join(", ") })
    );
  }

  return Response(
    res,
    await wrapper(req.headers.clientid).update(req.params.id, periodeLaporan)
  );
};

const remove = async (req, res) => {
  return Response(
    res,
    await wrapper(req.headers.clientid).delete(req.params.id)
  );
};

const deleteSome = async (req, res) => {
  const ids = req.body;

  if (!ids || !Array.isArray(ids)) {
    return Response(
      res,
      badRequest({ message: "Invalid request body. Expected an array of IDs." })
    );
  }

  for (const id of ids) {
    await wrapper(req.headers.clientid).delete(id);
  }

  return Response(
    res,
    success({ message: "Selected periods deleted successfully." })
  );
};

export default {
  all,
  getById,
  create,
  update,
  remove,
  deleteSome,
};
