const express = require("express");
const router = express.Router();

const CitizenController = require("../../../Controller/Client/Citizen/CitizenController");

router.post("/send-otp", CitizenController.sendOTP);
router.post("/verify-otp", CitizenController.verifyOTP);
router.post("/citizen-register", CitizenController.citizenRegister);
router.get("/getregisdata", CitizenController.getRegisData);
router.get("/checkapi", (req, res) => {
    res.send("ghlleo")
});
router.get("/getregisteredcitizen", CitizenController.getRegisteredCitizen);

router.post("/citizen-login", CitizenController.citizenLogin);
router.post("/chat-boat", CitizenController.chatBoat);

module.exports = router;
