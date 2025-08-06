import nodemailer from "nodemailer";
import ErrorHandler from "./error.handler.js";

const mailConfigs = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "teknis.pajakpegawai@gmail.com",
    pass: "scqxdbyafluylmin",
  },
};

const mailInitialize = {
  from: "Teknis Pajak Pegawai <teknis.pajakpegawai@gmail.com>",
  to: "",
  subject: "",
  text: "",
};

export default class NodeMailer {
  constructor() {
    this.transporter = nodemailer.createTransport(mailConfigs);
    this.mailOptions = mailInitialize;
  }

  to(email) {
    this.mailOptions.to = email;
    return this;
  }

  subject(subject) {
    this.mailOptions.subject = subject;
    return this;
  }

  body(body) {
    this.mailOptions.text = body;
    return this;
  }

  async send() {
    try {
      const response = await this.transporter.sendMail(this.mailOptions);
      return response;
    } catch (error) {
      ErrorHandler({ message: "Failed to send email", error });
    }
  }
}
