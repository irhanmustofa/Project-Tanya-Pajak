import winston from "winston";

const { combine, timestamp, json, colorize, printf } = winston.format;
const logFormat = combine(timestamp(), json());

const transports = [
  new winston.transports.File({
    filename: "error.log",
    level: "error",
  }),
  new winston.transports.Console({
    format: combine(
      colorize(),
      timestamp(),
      printf(({ level, message, timestamp }) => {
        return `[${timestamp}] ${level}: ${message}`;
      })
    ),
  }),
];

const errorLogger = winston.createLogger({
  level: "info",
  format: logFormat,
  defaultMeta: { service: "user-service" },
  transports,
});

export default function ErrorHandler({ message, error }) {
  let errorMessage = message;

  if (error?.stack) {
    const [firstLine, secondLine] = error.stack.split("\n");
    errorMessage += ` | ${firstLine?.trim()} ${secondLine?.trim()}`;
  } else if (error?.message) {
    errorMessage += ` | ${error.message}`;
  } else if (typeof error === "string") {
    errorMessage += ` | ${error}`;
  } else {
    errorMessage += ` | Unknown error format`;
  }

  console.error(errorMessage);
  errorLogger.error(errorMessage);
}
