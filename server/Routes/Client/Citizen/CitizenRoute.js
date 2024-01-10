const express = require("express");
const router = express.Router();

const CitizenController = require("../../../Controller/Client/Citizen/CitizenController");

router.post("/send-otp", CitizenController.sendOTP);
router.post("/verify-otp", CitizenController.verifyOTP);
router.post("/citizen-register", CitizenController.citizenRegister);
router.post("/citizen-login", CitizenController.citizenLogin);

module.exports = router;
