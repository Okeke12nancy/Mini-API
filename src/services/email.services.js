// import config from "../config.js";
import dotenv from "dotenv";

dotenv.config();

// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
import config from "../config/index.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: config.emailTest,
    pass: config.emailTestAppPswd,
  },
});

export async function verifyEmail(firstName, lastName, userEmail, link) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_TEST,
      to: userEmail,
      subject: "Welcome to Post-It.  Email verification",
      html: `<div>
                Hello ${firstName} ${lastName}, Please verify your email by clicking this <a href="${link}">link</a>.
            </div>`,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function passwordChange(userEmail) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_TEST,
      to: userEmail,
      subject: "Security Alert",
      html: `<div>
                  <p>Hey Post-It User, you're getting this email because you just changed your password. If you didn't make this request. Contact Admin ASAP</p> 
              </div>`,
    });
  } catch (err) {
    console.log(err);
  }
}
