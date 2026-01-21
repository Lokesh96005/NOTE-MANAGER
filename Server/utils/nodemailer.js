const nodemailer = require("nodemailer");

// Create a transporter using Ethereal test credentials.

const transporter = nodemailer.createTransport({
    service:"gmail",
  auth: {
    user: "lokesh747447@gmail.com",
    pass: "fqgc ztwp jwhi qknl",
  },
});

// Send an email using async/await
const sendMail= async (email,otp) => {
  const info = await transporter.sendMail({
    from: 'lokesh747447@gmail.com',
    to: email,
    subject: "OTP VERIFICATION CODE",
    text: `YOUR OTP IS ${otp} & its valid for 5 min`, // Plain-text version of the message
    html: `<b>YOUR OTP IS ${otp} & its valid for 5 min</b>`, // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
};


module.exports=sendMail;