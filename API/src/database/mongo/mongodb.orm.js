import ErrorHandler from "../../utils/error.handler.js";
import {
  dbError,
  dbCreated,
  dbUpdated,
  dbDeleted,
  dbNotFound,
  dbSuccess,
} from "../database.response.js";

import mongoose from "mongoose";

const arrValidOperators = [
  "=",
  ">",
  "<",
  ">=",
  "<=",
  "!=",
  "<>",
  "in",
  "IN",
  "not in",
  "NOT IN",
];

export default class MongodbORM {
  static model = null;
  static query = {};
  static options = {};
  static pipeline = [];

  static collection(model) {
    this.model = model;
    this.resetQuery();
    return this;
  }

  static resetQuery() {
    this.query = {};
    this.options = {};
    this.pipeline = [];
  }

  static excludeSoftDelete() {
    if (!this.query.hasOwnProperty("deleted_at ")) {
      this.query.deleted_at = null;
    }
  }

  static where(field, operator, value) {
    if (value === undefined) {
      this.query[field] = operator;
    } else {
      if (!arrValidOperators.includes(operator)) {
        throw new Error("Invalid operator in where()");
      }

      if (
        field === "_id" &&
        typeof value === "string" &&
        mongoose.Types.ObjectId.isValid(value)
      ) {
        value = new mongoose.Types.ObjectId(value);
      }

      switch (operator) {
        case "=":
          this.query[field] = value;
          break;
        case ">":
          this.query[field] = { $gt: value };
          break;
        case "<":
          this.query[field] = { $lt: value };
          break;
        case ">=":
          this.query[field] = { $gte: value };
          break;
        case "<=":
          this.query[field] = { $lte: value };
          break;
        case "!=":
        case "<>":
          this.query[field] = { $ne: value };
          break;
        case "in":
        case "IN":
          this.query[field] = { $in: value };
          break;
        case "not in":
        case "NOT IN":
          this.query[field] = { $nin: value };
          break;
      }
    }

    return this;
  }

  static orWhere(conditions = []) {
    this.query["$or"] = conditions.map(({ field, operator, value }) => {
      let cond = {};
      switch (operator) {
        case "=":
          cond[field] = value;
          break;
        case ">":
          cond[field] = { $gt: value };
          break;
        case "<":
          cond[field] = { $lt: value };
          break;
        case ">=":
          cond[field] = { $gte: value };
          break;
        case "<=":
          cond[field] = { $lte: value };
          break;
        case "!=":
        case "<>":
          cond[field] = { $ne: value };
          break;
      }
      return cond;
    });
    return this;
  }

  static select(fields = []) {
    if (Array.isArray(fields) && fields.length > 0) {
      this.options.projection = {};
      fields.forEach((field) => (this.options.projection[field] = 1));
    }
    return this;
  }

  static orderBy(field, direction = "asc") {
    this.options.sort = { [field]: direction === "desc" ? -1 : 1 };
    return this;
  }

  static limit(n) {
    this.options.limit = n;
    return this;
  }

  static skip(n) {
    this.options.skip = n;
    return this;
  }

  static join({ from, localField, foreignField, as }) {
    this.pipeline.push({
      $lookup: { from, localField, foreignField, as },
    });
    return this;
  }

  static match(matchQuery = {}) {
    this.pipeline.push({ $match: matchQuery });
    return this;
  }

  static groupBy(field) {
    this.pipeline.push({ $group: { _id: `$${field}`, count: { $sum: 1 } } });
    return this;
  }

  static sum(field) {
    this.pipeline.push({ $group: { _id: null, total: { $sum: `$${field}` } } });
    return this;
  }

  static project(fields = []) {
    if (Array.isArray(fields) && fields.length > 0) {
      const proj = {};
      fields.forEach((f) => (proj[f] = 1));
      this.pipeline.push({ $project: proj });
    }
    return this;
  }

  static async aggregate() {
    try {
      if (Object.keys(this.query).length) {
        this.pipeline.unshift({ $match: this.query });
      }
      const result = await this.model.aggregate(this.pipeline);
      return result.length === 0 ? dbNotFound() : dbSuccess(result);
    } catch (error) {
      ErrorHandler({ message: "Failed to aggregate", error });
      return dbError(error.message);
    } finally {
      this.resetQuery();
    }
  }

  static async all() {
    try {
      const result = await this.model.find();
      return result.length === 0 ? dbNotFound() : dbSuccess(result);
    } catch (error) {
      ErrorHandler({ message: "Failed to fetch all documents", error });
      return dbError(error.message);
    } finally {
      this.resetQuery();
    }
  }

  static async get() {
    try {
      this.excludeSoftDelete();
      const result = await this.model
        .find(this.query, this.options.projection || {})
        .sort(this.options.sort || {})
        .limit(this.options.limit || 0)
        .skip(this.options.skip || 0);
      return result.length === 0 ? dbNotFound() : dbSuccess(result);
    } catch (error) {
      ErrorHandler({ message: "Failed to get documents", error });
      return dbError(error.message);
    } finally {
      this.resetQuery();
    }
  }

  static async first() {
    try {
      this.excludeSoftDelete();
      const result = await this.model.findOne(
        this.query,
        this.options.projection || {}
      );
      return result ? dbSuccess([result]) : dbNotFound();
    } catch (error) {
      ErrorHandler({ message: "Failed to get first document", error });
      return dbError(error.message);
    } finally {
      this.resetQuery();
    }
  }

  static _sanitizeInput(data) {
    for (const key in data) {
      if (typeof data[key] === "string") {
        data[key] = data[key].replace(/\s+/g, " ").trim();
      }
    }
    return data;
  }

  static async create(data) {
    try {
      const clean = this._sanitizeInput(data);
      const result = await this.model.create(clean);
      return result ? dbCreated() : dbError("Create failed");
    } catch (error) {
      ErrorHandler({ message: "Failed to create document", error });
      return dbError(error.message);
    }
  }

  static async bulkCreate(data = []) {
    try {
      if (!Array.isArray(data) || data.length === 0) return dbNotFound();
      const cleaned = data.map((d) => this._sanitizeInput(d));
      const result = await this.model.insertMany(cleaned);
      return dbSuccess(result);
    } catch (error) {
      ErrorHandler({ message: "Failed to bulk insert", error });
      return dbError(error.message);
    }
  }

  static async update(data = {}) {
    try {
      this.excludeSoftDelete();
      const clean = this._sanitizeInput(data);
      const result = await this.model.updateMany(this.query, { $set: clean });
      return dbUpdated();
    } catch (error) {
      ErrorHandler({ message: "Failed to update", error });
      return dbError(error.message);
    } finally {
      this.resetQuery();
    }
  }

  static async delete() {
    try {
      this.excludeSoftDelete();
      const result = await this.model.updateMany(this.query, {
        deleted_at: new Date(),
      });
      return result.modifiedCount > 0
        ? dbDeleted()
        : dbNotFound();
    } catch (error) {
      ErrorHandler({ message: "Failed to soft delete", error });
      return dbError(error.message);
    } finally {
      this.resetQuery();
    }
  }

  static async hardDelete() {
    try {
      const result = await this.model.deleteMany(this.query);
      return result.deletedCount > 0 ? dbDeleted() : dbNotFound();
    } catch (error) {
      ErrorHandler({ message: "Failed to hard delete", error });
      return dbError(error.message);
    } finally {
      this.resetQuery();
    }
  }

  static async count() {
    try {
      this.excludeSoftDelete();
      const result = await this.model.countDocuments(this.query);
      return dbSuccess([{ count: result }]);
    } catch (error) {
      ErrorHandler({ message: "Failed to count documents", error });
      return dbError(error.message);
    } finally {
      this.resetQuery();
    }
  }

  static debug(label = "DEBUG") {
    console.log(`\n--- ${label} ---`);
    console.log("Query:", JSON.stringify(this.query, null, 2));
    console.log("Options:", JSON.stringify(this.options, null, 2));
    if (this.pipeline.length > 0) {
      console.log("Pipeline:", JSON.stringify(this.pipeline, null, 2));
    }
    console.log("--- END DEBUG ---\n");
    return this;
  }

  static async restore() {
    try {
      const result = await this.model.updateMany(
        { ...this.query, deleted_at: { $ne: null } },
        { $set: { deleted_at: null } }
      );
      return result.modifiedCount > 0 ? dbUpdated() : dbNotFound();
    } catch (error) {
      ErrorHandler({
        message: "Failed to restore soft-deleted documents",
        error,
      });
      return dbError(error.message);
    } finally {
      this.resetQuery();
    }
  }
}
