import mongoose from "mongoose";
import { mongoConfig } from "./mongo.config.js";

const connections = {};
const models = {};

export const createConnection = ({
  client_id,
  collection,
  schema,
  is_client = false,
}) => {
  const urlMaster = mongoConfig.urlMaster;
  const urlClient = mongoConfig.urlClient(client_id);

  let activeUrl = null;
  if (is_client && client_id) {
    activeUrl = urlClient;
  } else if (!is_client && client_id === undefined) {
    activeUrl = urlMaster;
  }

  if (!activeUrl) {
    console.error("No valid MongoDB URL provided.");
    return null;
  }

  let connection = connections[client_id];
  if (!connection) {
    connection = mongoose.createConnection(activeUrl);

    connection.on("connected", () => {
      console.log(`MongoDB connected: ${activeUrl}`);
    });

    connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    connection.on("disconnected", () => {
      console.log("MongoDB connection disconnected.");
    });

    connections[client_id] = connection;
  }

  if (!models[client_id]) {
    models[client_id] = {};
  }

  if (!models[client_id][collection]) {
    const mongooseSchema = new mongoose.Schema(
      {
        ...schema,
        deleted_at: { type: Date, default: null },
      },
      {
        timestamps: {
          createdAt: "created_at",
          updatedAt: "updated_at",
        },
      }
    );

    models[client_id][collection] = connection.model(
      collection,
      mongooseSchema
    );
  }

  return models[client_id][collection];
};
