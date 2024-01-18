const express = require("express");
const router = express.Router();



const Feedback = require("../../Controller/Admin/Feedback");

router.route('/getfeedback/:id').get(Feedback.getFeedback)
router.route('/getcitizenfeedback').get(Feedback.getCitizenFeedback)

module.exports = router;