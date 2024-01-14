const conn = require("../../../Database/conn");

const emergencyComplaint = async (req, res) => {
  let newVideo = "";
  let newImages = [];

  // Check if a video file was uploaded
  if (req.files && req.files["video"] && req.files["video"].length > 0) {
    newVideo = req.files["video"][0].filename;
  }

  // Check if image files were uploaded
  if (req.files && req.files["images"] && req.files["images"].length > 0) {
    newImages = req.files["images"].map((image) => image.filename);
  }

  try {
    const { location, did, sid } = req.body;
    const sql =
      "INSERT INTO `rj_emergency_complaint` (`video`, `images`, `location`, `did`, `sid`) VALUES (?,?,?,?,?)";
    const data = [newVideo, newImages.join(","), location, did, sid];

    conn.query(sql, data, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Error adding record" });
      } else {
        res.send({ msg: "Added success", err: 0 });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in Emergency Complaint Add" });
  }
};

module.exports = { emergencyComplaint };
