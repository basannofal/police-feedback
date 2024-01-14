const express = require("express");
const router = express.Router();


const Myapplication = require("../../../Controller/Client/MyApplication/myapplicationController");


router.route("/getmyapplication/:id").get(Myapplication.getMyApplications);




module.exports = router;