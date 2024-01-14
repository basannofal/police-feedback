const express = require("express");
const router = express.Router();


const Myapplication = require("../../../Controller/Client/MyApplication/myapplicationController");


router.route("/getmyapplication/:id").get(Myapplication.getMyApplications);
router.route("/getlocalapplication/:id").get(Myapplication.getLocalApplications);
router.route("/editapoimenttime/:cid/:id").patch(Myapplication.editApoimentTime);
router.route("/editverify/:cid/:id").patch(Myapplication.editVerfiy);
router.route("/editrejectbypolice/:cid/:id").patch(Myapplication.editRejectByPolice);
router.route("/editrejectbyuser/:cid/:id").patch(Myapplication.editRejectByUser);
router.route("/editsuccess/:cid/:id").patch(Myapplication.editsuccess);




module.exports = router;