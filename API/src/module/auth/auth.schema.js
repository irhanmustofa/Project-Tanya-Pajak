import { mongoConfig } from "../../database/mongo/mongo.config.js";
import { createConnection } from "../../database/mongo/mongo.connection.js";

export const authenticationSchema = () => {
  const collection = mongoConfig.collection.authentication;
  const schema = {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    device: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
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

export const authorizationSchema = () => {
  const collection = mongoConfig.collection.authorization;
  const schema = {
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    device: {
      type: String,
      required: true,
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

export const tryLoginSchema = () => {
  const collection = mongoConfig.collection.try_logins;
  const schema = {
    client_id: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    hits: {
      type: Number,
      default: 0,
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

export const forgotPasswordSchema = () => {
  const collection = mongoConfig.collection.forgot_password;
  const schema = {
    client_id: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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

export const forgotPasswordSchema = () => {
  const collection = mongoConfig.collection.forgot_password;
  const schema = {
    client_id: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: false,
      trim: true
    },
    token: {
      type: String,
      required: true,
      unique: true,
      trim: true
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
}
