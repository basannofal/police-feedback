const express = require("express");
const router = express.Router();


const Feedback = require("../../../Controller/Client/Feedback/Feedback");


router.route("/addFeedback").post(Feedback.addFeedback);
router.route("/addLocalFeedback").post(Feedback.addLocalFeedback);




module.exports = router;