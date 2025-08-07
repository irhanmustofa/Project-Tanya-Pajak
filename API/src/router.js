import express from "express";

const router = express.Router();
import Response from "./app/response.js";
import { validatingUser } from "./utils/middleware.js";

import userRouter from "./module/master-user/user.route.js";
import PeriodeLaporanRouter from "./module/periode-laporan/periode-laporan.route.js";
import authRouter from "./module/auth/auth.route.js";
import groupRouter from "./module/master-group/group.route.js";
import clientRouter from "./module/master-client/client.route.js";
import assetRouter from "./module/asset/asset.route.js";
import saldoAwalRouter from "./module/saldo-awal/saldo.awal.route.js";
import jurnalUmumRouter from "./module/jurnal-umum/jurnal.umum.route.js";
import coaRouter from "./module/coa/coa.route.js";

const noValidate = ["/auth"];

router.use(async (req, res, next) => {
  if (!noValidate.some((path) => req.path.startsWith(path))) {
    const is_valid = await validatingUser(req.headers);

    if (!is_valid.success) {
      return Response(res, is_valid);
    }
  }

  next();
});

//  AUTH
router.use("/auth", authRouter);

// DATA MASTER
router.use("/group", groupRouter);
router.use("/client", clientRouter);
router.use("/user", userRouter);

// MASTER DI CLIENT
router.use("/coa", coaRouter);
router.use("/periode-laporan", PeriodeLaporanRouter);
router.use("/asset", assetRouter);

// LEMBAR KERJA
router.use("/saldo-awal", saldoAwalRouter);
router.use("/jurnal-umum", jurnalUmumRouter);
export default router;
