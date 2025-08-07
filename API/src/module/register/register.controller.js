import Response, { badRequest, success } from "../../app/response.js";
import MongodbWrapper from "../../database/mongo/mongo.wrapper.js";
import { generateId, randomString } from "../../utils/functions.js";
import Register from "./register.entities.js";
import { registerSchema } from "./register.schema.js";
import Mailer from "../../utils/mailer.js";
import { APPURL } from "../../config/config.js";
import { userSchema } from "../master-user/user.schema.js";
import { masterClientSchema } from "../master-client/master-client.schema.js";
import Client from "../master-client/master-client.entities.js";
<<<<<<< HEAD
import { akunSchema } from "../akun/akun.schema.js";
import Akun from "../akun/akun.entities.js";
=======
>>>>>>> 8662eb5 (update-register-auth)

const registerWrapper = new MongodbWrapper(registerSchema());
const userWrapper = new MongodbWrapper(userSchema());
const clientWrapper = new MongodbWrapper(masterClientSchema());
<<<<<<< HEAD
const akunWrapper = new MongodbWrapper(akunSchema());
=======
>>>>>>> 8662eb5 (update-register-auth)

const sendVerificationEmail = async (email, token) => {
  try {
    const mailer = new Mailer();
    mailer
      .to(email)
      .subject(`Account Verification`)
      .body("Link Activation: " + APPURL + "/verify/" + token);

    return await mailer.send();
  } catch (error) {
    console.error("Failed to send email:", error);
    return null;
  }
};

const registration = async (req, res) => {
<<<<<<< HEAD
  const { name, company_name, company_npwp, email, password } = req.body;
  const token = randomString(30);
  const expired = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 jam

  try {
    const existing = await registerWrapper.getByFilter({
      email: email,
      company_npwp: company_npwp,
    });

    if (existing.success && existing.data.length > 0) {
      const regData = existing.data[0];
      if (regData.status === 0) {
        const updated = await registerWrapper.update(regData._id, {
          name,
          company_name,
          company_npwp,
          email,
          password,
          token,
          status: 0,
          expired,
        });

        if (!(await sendVerificationEmail(email, token))?.accepted?.length) {
          return Response(
            res,
            badRequest("Failed to send verification email!")
          );
=======
    console.log("Registration request received:", req.body);
    const { name, company_name, email, password } = req.body;
    const getDataRegistered = await registerWrapper.getByFilter({ 'email': email });



    if (getDataRegistered.success) {
        if (getDataRegistered.data[0].status === 0) {
            const token = randomString(30);
            const updateData = await registerWrapper.update(getDataRegistered.data[0]._id, {
                name: name,
                company_name: company_name,
                email: email,
                password: password,
                token: token,
                status: 0,
                expired: new Date(Date.now() + 24 * 60 * 60 * 1000)
            });

            const emailResponse = await sendVerificationEmail(email, token);
            if (!emailResponse || emailResponse.accepted.length === 0) {
                return Response(res, badRequest("Failed to send verification email!"));
            }

            return Response(res, success({ message: "Registration updated successfully. Please check your email!", data: updateData }));
        } else {
            return Response(res, badRequest({ message: "Email already registered and verified!" }));
        }
    } else {
        const newRegistration = new Register(req.body);
        if (!newRegistration || newRegistration.errors) {
            return Response(res, badRequest({ message: newRegistration.errors.join(", ") }));
        }

        const token = randomString(30);
        const createdRegistration = await registerWrapper.create({
            name: newRegistration.name,
            company_name: newRegistration.company_name,
            email: newRegistration.email,
            password: newRegistration.password,
            token: token,
            status: 0,
            expired: new Date(Date.now() + 24 * 60 * 60 * 1000)
        });

        const emailResponse = await sendVerificationEmail(email, token);
        if (!emailResponse || emailResponse.accepted.length === 0) {
            return Response(res, badRequest({ message: "Failed to send verification email! Please try again." }));
>>>>>>> 8662eb5 (update-register-auth)
        }

        return Response(
          res,
          success({
            message:
              "Registration updated successfully. Please check your email!",
            data: updated,
          })
        );
      }
      return Response(
        res,
        badRequest({ message: "Email already registered and verified!" })
      );
    }

    const newRegistration = new Register(req.body);
    if (!newRegistration || newRegistration.errors) {
      return Response(
        res,
        badRequest({ message: newRegistration.errors.join(", ") })
      );
    }

    const created = await registerWrapper.create({
      ...newRegistration,
      token,
      status: 0,
      expired,
    });

    if (!(await sendVerificationEmail(email, token))?.accepted?.length) {
      return Response(
        res,
        badRequest({
          message: "Failed to send verification email! Please try again.",
        })
      );
    }

    return Response(
      res,
      success({
        message: "Registration successful. Please check your email!",
        data: created,
      })
    );
  } catch (err) {
    console.error("Registration error:", err);
    return Response(
      res,
      badRequest({ message: "Server error during registration." })
    );
  }
};

const verification = async (req, res) => {
  let valid = true;
  const { token } = req.params;

  const verify = await registerWrapper.getByFilter({ token: token });

  if (!verify.success || verify.data.length === 0) {
    valid = false;
    return Response(res, badRequest("Invalid or expired verification token!"));
  }

  const registerData = verify.data[0];
  if (registerData.status === 1) {
    return Response(
      res,
      badRequest({ message: "This account has already been verified!" })
    );
  }

  if (new Date() > new Date(registerData.expired)) {
    valid = false;
    return Response(
      res,
      badRequest({
        message: "Verification link has expired! Please register again.",
      })
    );
  }

  if (valid) {
    const existingUser = await userWrapper.getByFilter({
      email: registerData.email,
      client_id: registerData.client_id,
    });
    if (existingUser.success) {
      return Response(
        res,
        badRequest({
          message: "User with this email already exists in Company!",
        })
      );
    }

    const clientId = generateId();
    const newClient = new Client({
      _id: clientId,
      company_name: registerData.company_name,
      company_npwp: registerData.company_npwp,
      status: 1,
    });
    const addNewClient = await clientWrapper.create(newClient);

    if (!addNewClient.success) {
      return Response(
        res,
        badRequest({ message: "Failed to create client account!" })
      );
    }

    const newUser = {
      client_id: clientId,
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
      role: 0,
      status: 1,
      subscription: Date.now() + 30 * 24 * 60 * 60 * 1000,
      paket: 0,
    };

    const addNewUser = await userWrapper.create(newUser);

<<<<<<< HEAD
    if (!addNewUser.success) {
      return Response(
        res,
        badRequest({ message: "Failed to create user account!" })
      );
=======
        if (!updateRegister.success) {
            return Response(res, badRequest({ message: "Failed to update registration status!" }));
        }

        const existingUser = await userWrapper.getByFilter({ email: registerData.email });
        if (existingUser.success) {
            return Response(res, badRequest({ message: "User with this email already exists!" }));
        }
        const clientId = generateId();
        const newClient = new Client({
            _id: clientId,
            company_name: registerData.company_name,
            status: 1,
        });
        const addNewClient = await clientWrapper.create(newClient);
        if (!addNewClient.success) {
            return Response(res, badRequest({ message: "Failed to create client account!" }));
        }
        const newUser = new Register({
            client_id: clientId,
            name: registerData.name,
            email: registerData.email,
            password: registerData.password,
            role: 0,
            status: 1,
        });

        const addNewUser = await userWrapper.create(newUser);

        if (!addNewUser.success) {
            return Response(res, badRequest({ message: "Failed to create user account!" }));
        }

        return Response(res, success({
            message: "Verification successful! Your account has been activated."
        }));
>>>>>>> 8662eb5 (update-register-auth)
    }

    const newAkun = new Akun({
      client_id: clientId,
      client_service: 0,
      max_user: 0,
      client_paket: 0,
      client_active: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      client_status: 0,
    });

    const addNewAkun = await akunWrapper.create(newAkun);

    if (!addNewAkun.success) {
      return Response(
        res,
        badRequest({ message: "Failed to create client account details!" })
      );
    }
    const updateRegister = await registerWrapper.update(registerData._id, {
      status: 1,
    });

    if (!updateRegister.success) {
      return Response(
        res,
        badRequest({ message: "Failed to update registration status!" })
      );
    }

    return Response(
      res,
      success({
        message: "Verification successful! Your account has been activated.",
      })
    );
  }
};

const RegisterController = {
  registration,
  verification,
};

export default RegisterController;
