const nodemailer = require("nodemailer");

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "anastasiialytvynd@meta.ua",
    pass: process.env.META_PASSWORD,
  },
};

const sendMail = async (userEmail, verificationToken) => {
  console.log(userEmail);

  const transporter = nodemailer.createTransport(config);

  const emailOptions = {
    from: "anastasiialytvynd@meta.ua",
    to: userEmail,
    subject: "Confirm email",
    html: `<a target="_blank" href="${process.env.BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
  };

    console.log(emailOptions);
    
  try {
    await transporter.sendMail(emailOptions);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMail;
