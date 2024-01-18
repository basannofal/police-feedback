const express = require("express");
const router = express.Router();

const StationComplaint = require("../../Controller/Admin/StationComplaint");


router.route('/getallstationcomplaint/:id').get(StationComplaint.getStationComplaint)
router.route('/getalldistcomplaint/:id').get(StationComplaint.getDistComplaint)




module.exports = router;