const nodemailer = require("nodemailer");

async function SendPasswordResetLink(email, id) {
  const transporter = nodemailer.createTransport({
    name: "mail.privateemail.com",
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const msg = {
    from: "support@movielog.xyz",
    to: email,
    subject: "Reset password",
    text: "",
    html: `<b>Password reset id: ${id}</b>` /* !!! Change this to a link. */,
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
