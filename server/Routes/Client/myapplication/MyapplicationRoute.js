const express = require("express");
const router = express.Router();


const Myapplication = require("../../../Controller/Client/MyApplication/myapplicationController");


router.route("/getmyapplication/:id").get(Myapplication.getMyApplications);
router.route("/getlocalapplication/:id").get(Myapplication.getLocalApplications);
router.route("/editapoimenttime/:id").patch(Myapplication.editApoimentTime);




module.exports = router;