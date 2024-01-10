const express = require("express");
const router = express.Router();


const Station = require("../../Controller/Admin/Station");

router
    .route("/addStation")
    .post(Station.addStation);
router.route('/getStationData').get(Station.getStationData)
router.route('/getStationForEdit/:id').get(Station.getStationForEdit)
router.route('/deleteStation/:id').delete(Station.deleteStation)
router.route('/editStationData/:id').put(Station.editStationData)




module.exports = router;