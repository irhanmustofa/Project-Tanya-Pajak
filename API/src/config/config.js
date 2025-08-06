export const application = {
  port: 5000,
  host: "http://localhost",
};

export const corsConfig = {
  origin: "*",
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "token",
    "email",
    "device",
    "groupid",
    "clientid",
  ],
  methods: "GET,PUT,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

export const authConfig = {
  limitLogin: 5,
  expirationOtp: 5 * 60 * 1000,
  expirationToken: 10 * 60 * 1000,
};

export const adminconfig = {
  groupid: "ADM00",
};
