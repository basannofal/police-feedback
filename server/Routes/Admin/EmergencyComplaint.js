const express = require("express");
const router = express.Router();

// const Middleware = require("../controller/Middleware");
const EmrCom = require("../../Controller/Admin/EmergencyComplaint");

router.route("/getemergencycomplaints/:id").get(EmrCom.getEmergencyComplaints);

module.exports = router;
