const express = require("express");
const router = express.Router();



const AllFeedback = require("../../Controller/Admin/AllFeedback");

router.route('/getAllFeedback').get(AllFeedback.getAllFeedback)

module.exports = router;