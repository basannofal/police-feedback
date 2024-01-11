const express = require("express");
const router = express.Router();

// const Middleware = require("../controller/Middleware");
const DistrictAdmin = require("../../Controller/Admin/DistrictAdmin");

router.route("/district-admin-login").post(DistrictAdmin.districtAdminLogin);

module.exports = router;
