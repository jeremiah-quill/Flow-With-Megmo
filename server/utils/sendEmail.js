require("dotenv").config();
const nodemailer = require("nodemailer");

// email message options
const mailOptions = {
	from: "flowwithmegmo@gmail.com",
	to: "",
	subject: "",
	text: "",
};

// email transporter config
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "flowwithmegmo@gmail.com",
		pass: process.env.EMAIL_PW,
	},
});

// send email
const sendEmail = (toEmail, subject, message) => {
    mailOptions.to = toEmail;
	mailOptions.subject = subject;
	mailOptions.text = message;
	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
};

module.exports = sendEmail;
