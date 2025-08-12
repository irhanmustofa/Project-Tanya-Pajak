import MongodbORM from "../../database/mongo/mongodb.orm.js";

export default class authRepositories {
  constructor(model) {
    this.model = model;
  }

  async getByFilter(filter) {
    return await MongodbORM.collection(this.model).where(filter).first();
  }

  async setAuthentication(authentication) {
    const existingAuthentication = await MongodbORM.collection(this.model)
      .where("email", "=", authentication.email)
      .first();

    if (!existingAuthentication.success) {
      return await MongodbORM.collection(this.model).create(authentication);
    }

    return await MongodbORM.collection(this.model)
      .where("email", "=", authentication.email)
      .update(authentication);
  }

  async getAuthentication(email, device) {
    return await MongodbORM.collection(this.model)
      .where("email", "=", email)
      .where("device", "=", device)
      .first();
  }

  async setAuthorization(authorization) {
    const existingAuthorization = await MongodbORM.collection(this.model)
      .where("email", "=", authorization.email)
      .first();

    if (!existingAuthorization.success) {
      return await MongodbORM.collection(this.model).create(authorization);
    }

    return await MongodbORM.collection(this.model)
      .where("email", "=", authorization.email)
      .update(authorization);
  }

  async getAuthorization(email, device, token) {
    return await MongodbORM.collection(this.model)
      .where("email", "=", email)
      .where("device", "=", device)
      .where("token", "=", token)
      .first();
  }

  async setTryLogin(tryLogin) {
    const existingTryLogin = await MongodbORM.collection(this.model)
      .where("email", "=", tryLogin.email)
      .where("client_id", "=", tryLogin.client_id)
      .first();

    if (!existingTryLogin.success) {
      return await MongodbORM.collection(this.model).create(tryLogin);
    }

    return await MongodbORM.collection(this.model)
      .where("email", "=", tryLogin.email)
      .update(tryLogin);
  }

  async getTryLogin(email, client_id) {
    return await MongodbORM.collection(this.model)
      .where("email", "=", email)
      .where("client_id", "=", client_id)
      .first();
  }

  async logout(email, device, token) {
    const existingAuthorization = await MongodbORM.collection(this.model)
      .where("email", "=", email)
      .where("device", "=", device)
      .where("token", "=", token)
      .first();

    if (!existingAuthorization.success) {
      return { success: false, message: "Authorization not found" };
    }

    await MongodbORM.collection(this.model)
      .where("email", "=", email)
      .where("device", "=", device)
      .where("token", "=", token)
      .delete();

    return { success: true, message: "Logout successful" };
  }

  async setForgotPassword(forgotPassword) {
    const existingForgotPassword = await MongodbORM.collection(this.model)
      .where("email", "=", forgotPassword.email)
      .first();

    if (!existingForgotPassword.success) {
      return await MongodbORM.collection(this.model).create(forgotPassword);
    }

    return await MongodbORM.collection(this.model)
      .where("email", "=", forgotPassword.email)
      .update(forgotPassword);
  }

  async deleteForgotPassword(filter) {
    return await MongodbORM.collection(this.model).where(filter).hardDelete();
  }
}
