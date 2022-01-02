const nodemailer = require("nodemailer");

async function SendPasswordResetLink(email) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "brionna.toy2@ethereal.email",
      pass: "RaP8qj8Eus4jV7VTm9",
    },
  });

  // send mail with defined transport object
  console.log("email: ", email);
  const msg = {
    from: "auth@movielog.com",
    to: email,
    subject: "Reset password",
    text: "",
    html: "<b>Reset password link is sent.</b>",
  };

  const info = await transporter.sendMail(msg);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  return info;
}

module.exports = SendPasswordResetLink;
