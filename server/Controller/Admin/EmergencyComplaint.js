const conn = require("../../Database/conn");

const getEmergencyComplaints = (req, res) => {
  let id = req.params.id;

  const sql = `SELECT * FROM rj_emergency_complaint WHERE sid=${id}`;
  conn.query(sql, (err, data) => {
    if (err) return res.json(err);
    console.log(data);
    return res.json(data);
  });
};

module.exports = { getEmergencyComplaints };
