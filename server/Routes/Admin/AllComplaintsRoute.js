const express = require("express");
const router = express.Router();

// const Middleware = require("../controller/Middleware");
const AllComplaints = require("../../Controller/Admin/AllComplaints");

router.route("/getallcomplaints").get(AllComplaints.getAllComplaints);

module.exports = router;
