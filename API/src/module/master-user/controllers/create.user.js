import { badRequest } from "../../../app/response.js";
import User from "../user.entities.js";
import userRepositories from "../user.repositories.js";

export default async function createUser(body) {

    const data = new User(body);
    if (data.errors && data.errors.length > 0) {
        return badRequest({ message: data.errors.join(", ") });
    }

    return await userRepositories.create(data);
}