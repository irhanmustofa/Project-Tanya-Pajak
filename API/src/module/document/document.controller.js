import Response, { badRequest, success } from "../../app/response.js";
import MongodbWrapper from "../../database/mongo/mongo.wrapper.js";
import { moveFile } from "../../utils/uploadHandler.js";
import Document from "./document.entities.js";
import { documentSchema } from "./document.schema.js";
import fs from "fs";

const wrapper = (client_id) => new MongodbWrapper(documentSchema(client_id));

const getAll = async (req, res) => {
  return Response(res, await wrapper(req.headers.clientid).all());
};

const create = async (req, res) => {
  const input = { ...req.body };

  if (req.files?.file) {
    const newName = `Document-${input.nomor_dokumen}`;
    const folder = "documents";

    const fileResult = await moveFile(
      req.files.file,
      newName,
      folder,
      [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ],
      10
    );

    if (!fileResult.status) {
      return Response(
        res,
        error({
          message: fileResult.message || "File SPT Sebelumnya upload failed",
        })
      );
    } else {
      input.file = `/${fileResult.path}`;
    }
  }

  const document = new Document(input);

  if (document.errors) {
    return Response(
      res,
      badRequest({ message: document.errors.join(", ") })
    );
  }

  return Response(
    res,
    await wrapper(req.headers.clientid).create(document)
  );
};

const update = async (req, res) => {
  try {
    const input = { ...req.body };
    const clientId = req.headers.clientid;

    const documentId = req.params.id;
    console.log("Updating document with ID:", documentId);
    const existingDocument = await wrapper(clientId).getByFilter({
      _id: documentId,
    });
    console.log("Existing Document:", existingDocument);
    if (!existingDocument.success || !existingDocument.data) {
      return Response(res, badRequest({
        message: "Document not found"
      }));
    }

    if (req.files?.file) {
      const newName = `Document-${input.nomor_dokumen}`;
      const folder = "documents";

      const fileResult = await moveFile(
        req.files.file,
        newName,
        folder,
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "image/jpeg",
          "image/png",
          "image/jpg",
          "image/webp",
        ],
        10
      );

      if (!fileResult.status) {
        return Response(
          res,
          error({
            message: fileResult.message || "File SPT Sebelumnya upload failed",
          })
        );
      } else {
        input.file = `/${fileResult.path}`;
      }
    }

    const document = new Document(input);
    if (document.errors && document.errors.length > 0) {
      return Response(
        res,
        badRequest({ message: document.errors.join(", ") })
      );
    }

    const updateResult = await wrapper(clientId).update(documentId, input);

    if (!updateResult.success) {
      return Response(res, badRequest({
        message: "Failed to update document"
      }));
    }

    return Response(res, success({
      message: "Document updated successfully",
      data: updateResult.data
    }));

  } catch (error) {
    console.error("Error updating document:", error);
    return Response(res, badRequest({
      message: "Failed to update document",
      error: error.message
    }));
  }
};

const remove = async (req, res) => {
  const document = await wrapper(req.headers.clientid).getByFilter({
    _id: req.params.id,
  });
  if (!document.success || !document.data) {
    return Response(res, badRequest({ message: "Document not found" }));
  }

  if (document.data[0].file) {
    const filePath = `./public${document.data[0].file}`;
    try {
      await fs.promises.unlink(filePath);
    } catch (error) {
      console.error("Error deleting file:", error);
      return Response(res, badRequest({ message: "Failed to delete file" }));
    }
  }

  return Response(res, await wrapper(req.headers.clientid).delete(req.params.id));
};

const deleteSome = async (req, res) => {
  try {
    const clientId = req.headers.clientid;
    const toDelete = req.body;

    if (!Array.isArray(toDelete) || toDelete.length === 0) {
      return Response(res, badRequest({ message: "Expected array of IDs" }));
    }

    for (const documentId of toDelete) {
      const document = await wrapper(clientId).getByFilter({ _id: documentId });

      if (document.success && document.data.length > 0) {
        const filePath = document.data[0].file;
        if (filePath) {
          try {
            await fs.promises.unlink(`./public${filePath}`);
          } catch (error) {
            console.error("File delete error:", error);
          }
        }

        await wrapper(clientId).delete(documentId);
      }
    }

    return Response(res, success({ message: "Documents deleted successfully" }));

  } catch (error) {
    return Response(res, badRequest({ message: "Delete failed" }));
  }
};

const documentController = {
  getAll,
  create,
  update,
  remove,
  deleteSome,
};

export default documentController;
