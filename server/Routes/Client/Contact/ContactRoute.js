const express = require("express");
const router = express.Router();


const Contact = require("../../../Controller/Client/Contact/Contact");


router.route("/getContact").get(Contact.getContact);
router.route("/getContactStation").get(Contact.getContactStation);




module.exports = router;