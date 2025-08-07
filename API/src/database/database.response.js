import mongoose from "mongoose";

const formatMongoDoc = (doc) => {
  if (Array.isArray(doc)) {
    return doc.map(formatMongoDoc);
  }

  if (doc && typeof doc === "object") {
    const raw = doc._doc ?? doc;
    const newDoc = { ...raw };

    for (const key in newDoc) {
      if (
        newDoc[key] instanceof mongoose.Types.ObjectId ||
        (typeof newDoc[key] === "object" &&
          newDoc[key] !== null &&
          newDoc[key]._bsontype === "ObjectID")
      ) {
        newDoc[key] = newDoc[key].toString();
      }
    }

    if (newDoc._id && newDoc._id.toString) {
      newDoc._id = newDoc._id.toString();
    }

    return newDoc;
  }

  return doc;
};

export const dbSuccess = (data) => {
  const formatted = formatMongoDoc(data);

  return {
    code: 200,
    success: true,
    count: Array.isArray(formatted) ? formatted.length : 1,
    data: formatted,
  };
};

export const dbNotFound = () => {
  return {
    code: 404,
    success: false,
    message: "Data Not Found",
  };
};

export const dbError = (msg = "Internal Server Error") => {
  return {
    code: 500,
    success: false,
    message: msg,
  };
};

export const dbCreated = () => {
  return {
    code: 201,
    success: true,
    message: "Data Created",
  };
};

export const dbUpdated = () => {
  return {
    code: 200,
    success: true,
    message: "Data Updated",
  };
};

export const dbDeleted = () => {
  return {
    code: 200,
    success: true,
    message: "Data Deleted",
  };
};
