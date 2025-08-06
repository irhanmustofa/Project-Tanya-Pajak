import { mongoConfig } from "../../database/mongo/mongo.config.js";
import { createConnection } from "../../database/mongo/mongo.connection.js";

export const registerSchema = () => {
  const collection = mongoConfig.collection.register;
  const schema = {
    name: {
      type: String,
      required: true,
<<<<<<< HEAD
      trim: true,
    },
    company_name: {
      type: String,
      required: true,
      trim: true,
    },
    company_npwp: {
      type: String,
      required: true,
      trim: true,
=======
      trim: true
>>>>>>> 2cd1356 (update-register)
    },
    company_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
<<<<<<< HEAD
      trim: true,
      unique: false,
    },
    password: {
      type: String,
      required: true,
=======
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
>>>>>>> 2cd1356 (update-register)
    },
    token: {
      type: String,
      required: true,
      unique: true,
<<<<<<< HEAD
      trim: true,
=======
      trim: true
>>>>>>> 2cd1356 (update-register)
    },
    status: {
      type: Number,
      required: true,
<<<<<<< HEAD
      default: 0,
=======
      default: 0
>>>>>>> 2cd1356 (update-register)
    },
    expired: {
      type: Date,
      default: Date.now,
    },
  };

  return createConnection({
    collection,
    schema,
  });
};
