const express = require("express");
const path = require("path");
const router = express.Router();
const complaintController = require("../../../Controller/Client/complaints/complaintController");

const multer = require("multer");

var imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    const imagePath = path.join(
      __dirname,
      "../../../../client/public/upload/complaint"
    );
    callback(null, imagePath);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}.${file.originalname}`);
  },
});

var upload = multer({
  storage: imgconfig,
});

router
  .route("/addcomplaint/:id")
  .post(
    upload.fields([{ name: "itemimage", maxCount: 1 }]),
    complaintController.addComplaint
  );

module.exports = router;
