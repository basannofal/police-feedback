const express = require("express");
const router = express.Router();


const DistrictStation = require("../../Controller/Admin/DistrictStation");



router.route('/getstationdata/:id').get(DistrictStation.getDistrictStation)


module.exports = router;