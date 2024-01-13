const conn = require("../../../Database/conn");

const addComplaint = async(req, res) => {
  const id = req.params.id;
  
  let newfilename = "";
  if (req.files && req.files.itemimage) {
    newfilename = req.files.itemimage[0].filename;
    console.log("in if item_image");
  }
  try {
    const {
      fname,
      mname,
      lname,
      email,
      number,
      address,
      pincode,
      did,
      sid,
      itemname,
      itemdesc,
      itemimage,
    } = req.body;
    const sql =
      "INSERT INTO `rj_citizen_complaint`( `fname`, `mname`, `surname`, `number`, `email`, `present_address`, `pincode`, `item_name`, `item_desc`, `item_img`, `status`,  `dist_id`, `local_id`, `user_id`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const data = [
      fname,
      mname,
      lname,
      email,
      number,
      address,
      pincode,
      itemname,
      itemdesc,
      newfilename,
      0,
      did,
      sid,
      id,
    ];

    conn.query(sql, data, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Error adding record" });
      } else {
        res.send({msg:"Added success", err:0});
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({msg:"Error in Complaint Add"})
  }
};

module.exports = { addComplaint };
