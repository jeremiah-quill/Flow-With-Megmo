const emailRoutes = require("express").Router();
const sendEmail = require("../../utils/sendEmail.js");

emailRoutes.post("/", (req, res) => {
    const {toEmail, subject, message} = req.body

    sendEmail(toEmail, subject, message)

    res.json(req.body);
});

module.exports = emailRoutes;
