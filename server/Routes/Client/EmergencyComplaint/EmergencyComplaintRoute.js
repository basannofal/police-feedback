const express = require("express");
const path = require("path");
const router = express.Router();
const EmergencyComplaint = require("../../../Controller/Client/EmergencyComplaint/EmergencyComplaint");

const multer = require("multer");

var ecomplaintconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    const CPath = path.join(
      __dirname,
      "../../../../client/public/upload/emegencycomplaint"
    );
    callback(null, CPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}.${file.originalname}`);
  },
});

var upload = multer({
  storage: ecomplaintconfig,
});

router
  .route("/addemergencycomplaint")
  .post(
    upload.fields([{ name: "video", maxCount: 1 }, { name: "images" }]),
    EmergencyComplaint.emergencyComplaint
  );

module.exports = router;
