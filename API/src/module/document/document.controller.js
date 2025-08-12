import Response, { badRequest, success } from "../../app/response.js";
import MongodbWrapper from "../../database/mongo/mongo.wrapper.js";
import { moveFile } from "../../utils/uploadHandler.js";
import Document from "./document.entities.js";
import { documentSchema } from "./document.schema.js";

const wrapper = (client_id) => new MongodbWrapper(documentSchema(client_id));

const getAll = async (req, res) => {
  return Response(res, await wrapper(req.headers.clientid).all());
};

const create = async (req, res) => {
  const input = { ...req.body };

  if (req.files?.file) {
    const newName = `Document-${Date.now()}`;
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

// const update = async (req, res) => {
//   const user = new User(req.body);
//   if (user.errors && user.errors.length > 0) {
//     return Response(res, badRequest({ message: user.errors.join(", ") }));
//   }
//   console.log("Updating user with ID:", req.params);
//   return Response(res, await wrapper.update(req.params.id, user));
// };

// const remove = async (req, res) => {
//   return Response(res, await wrapper.delete(req.params.id));
// };

// const deleteSome = async (req, res) => {
//   console.log("Deleting users with IDs:", req.body);
//   const toDelete = req.body.map((id) => ({ _id: id }));

//   if (!toDelete || !Array.isArray(toDelete)) {
//     return Response(
//       res,
//       badRequest({ message: "Invalid request body. Expected an array of IDs." })
//     );
//   }

//   if (toDelete.length === 0) {
//     return Response(
//       res,
//       badRequest({ message: "No IDs provided in the request body." })
//     );
//   }

//   for (const id of toDelete) {
//     const result = await wrapper.delete(id._id);

//     if (!result.success) {
//       return Response(res, badRequest({ message: result.message }));
//     }
//   }

//   return Response(res, success({ message: "Users deleted successfully." }));
// };

const documentController = {
  getAll,
  create,
  // update,
  // remove,
  // deleteSome,
};

export default documentController;
