const express = require("express");
const router = express.Router();

// const Middleware = require("../controller/Middleware");
const District = require("../../Controller/Admin/District");

router
    .route("/addDistrict")
    .post(District.addDistrict);
router.route('/getDistrict').get(District.getAllData)
router.route('/getDistrictForEdit/:id').get(District.getDistrictForEdit)
router.route('/editDistData/:id').put(District.editDistData)
router.route('/deleteDistrict/:id').delete(District.deleteDistrict)


module.exports = router;
