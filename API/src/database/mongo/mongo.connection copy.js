import mongoose from "mongoose";
import { mongoConfig } from "./mongo.config.js";
const connections = {};

export const createConnection = (data) => {
  const { client_id, collection, schema, is_client = false } = data;

  const urlMaster = mongoConfig.urlMaster;
  const urlClient = mongoConfig.urlClient(client_id);

  let activeUrl = null;
  if (is_client && client_id) {
    activeUrl = urlClient;
  } else if (!is_client && client_id === undefined) {
    activeUrl = urlMaster;
  }

  if (!activeUrl) {
    console.error("No valid MongoDB URL provided for connection.");
    return null;
  }

  try {
    console.log(`Connecting to MongoDB client ${client_id} ...`);
    const connection = mongoose.createConnection(activeUrl);

    connection.on("connected", () => {
      console.log("MongoDB connection established successfully.", activeUrl);
    });

    connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    connection.on("disconnected", () => {
      console.log("MongoDB connection disconnected.");
    });

    connections[client_id] = connection;
    return connection.model(collection, new mongoose.Schema(schema));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
