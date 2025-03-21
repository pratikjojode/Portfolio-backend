const express = require("express");
const { sendContactDetails } = require("../controllers/contactController");
const router = express.Router();

router.post("/sendContact", sendContactDetails);

module.exports = router;
