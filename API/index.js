import express from "express";
import cors from "cors";
import path from "path";
import fileUpload from "express-fileupload";
import { corsConfig, application } from "./src/config/config.js";
import router from "./src/router.js";
import ErrorHandler from "./src/utils/error.handler.js";

const app = express();

app.use("/public", express.static(path.join(process.cwd(), "public")));

app.use(
  cors(corsConfig),
  express.json({ limit: "50mb" }),
  express.urlencoded({ limit: "50mb", extended: true }),
  fileUpload()
);


app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url} from ${req.ip}`);

  next();
});

app.use(router);

app.use((req, res) => {
  res.status(404).send("Route Not Found");
});

app.use((err, req, res) => {
  ErrorHandler({ message: "Something broke!", error: err });
  res.status(500).json({
    success: false,
    message: "Server Side Error",
  });
});

app.listen(application.port, () => {
  console.log(`Server is running on ${application.host}:${application.port}`);
});
