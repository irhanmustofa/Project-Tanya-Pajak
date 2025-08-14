import express from "express";

const router = express.Router();
import Response from "./app/response.js";
import { validatingUser } from "./utils/middleware.js";

import userRouter from "./module/master-user/user.route.js";
import authRouter from "./module/auth/auth.route.js";
import clientRouter from "./module/master-client/client.route.js";
import registerRouter from "./module/register/register.route.js";
import userClientRouter from "./module/user-client/user.client.route.js";
import permissionRouter from "./module/permission/permission.route.js";
import alamatRouter from "./module/alamat-client/alamat.route.js";

const noValidate = ["/auth", "/register", "/permission"];

// router.use(async (req, res, next) => {
//   if (!noValidate.some((path) => req.path.startsWith(path))) {
//     const is_valid = await validatingUser(req.headers);

//     if (!is_valid.success) {
//       return Response(res, is_valid);
//     }
//   }

//   next();
// });

// PERMISSION
router.use("/permission", permissionRouter);

// REGISTER
router.use("/register", registerRouter);
//  AUTH
router.use("/auth", authRouter);

// USERCLIENT
router.use("/user-client", userClientRouter);

// DATA MASTER
router.use("/client", clientRouter);
router.use("/alamat-client", alamatRouter);
router.use("/users", userRouter);

export default router;
