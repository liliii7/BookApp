const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 587,
  auth: {
    user: "lidiaquinones2005@gmail.com",
    pass: "bnloqozizfxeuopt",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
