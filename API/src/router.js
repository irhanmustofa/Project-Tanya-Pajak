import express from "express";

const router = express.Router();
import Response from "./app/response.js";
import { validatingUser } from "./utils/middleware.js";

import userRouter from "./module/master-user/user.route.js";
import authRouter from "./module/auth/auth.route.js";
import clientRouter from "./module/master-client/client.route.js";
<<<<<<< HEAD
import registerRouter from "./module/register/register.route.js";
import userClientRouter from "./module/user-client/user.client.route.js";
=======
>>>>>>> 979ceae (update files)

const noValidate = ["/auth", "/register"];

<<<<<<< HEAD
// router.use(async (req, res, next) => {
//   if (!noValidate.some((path) => req.path.startsWith(path))) {
//     const is_valid = await validatingUser(req.headers);

//     if (!is_valid.success) {
//       return Response(res, is_valid);
//     }
//   }
=======
router.use(async (req, res, next) => {
  if (!noValidate.some((path) => req.path.startsWith(path))) {
    // const is_valid = await validatingUser(req.headers);
    // if (!is_valid.success) {
    //   return Response(res, is_valid);
    // }
  }

  next();
});
>>>>>>> 979ceae (update files)

//   next();
// });
// REGISTER
router.use("/register", registerRouter);
//  AUTH
router.use("/auth", authRouter);

<<<<<<< HEAD
// USERCLIENT
router.use("/user-client", userClientRouter);

// DATA MASTER
router.use("/client", clientRouter);
router.use("/user", userRouter);

=======
//MASTER
router.use("/client", clientRouter);
router.use("/user", userRouter);
>>>>>>> 979ceae (update files)
export default router;
