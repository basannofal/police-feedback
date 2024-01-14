const conn = require("../../../Database/conn");

const getMyApplications = (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const sql = "SELECT * FROM rj_citizen_complaint where user_id = ?";
  conn.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    console.log(data);
    return res.json(data);
  });
};

const getLocalApplications = (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const sql = "SELECT * FROM rj_citizen_complaint where local_id = ?";
  conn.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    console.log(data);
    return res.json(data);
  });
};

const editApoimentTime = (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const currentDate = new Date();

  // Extract date components
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
  const day = currentDate.getDate();

  // Format the date as "YYYY-MM-DD"
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  // Extract time components
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // Format the time as "HH:MM:SS"
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    let {id} = req.params;
    const { appointment_date, appointment_time} = req.body;
    const sql =
      "UPDATE `rj_citizen_complaint` SET `status`= ?, `raw_fir_date`= ?, `raw_fir_time`= ?, `appointment_date`= ?, `appointment_time`= ?  WHERE id=?";
    const data = [1, formattedDate, formattedTime, appointment_date, appointment_time, id];

    conn.query(sql, data, (error) => {
      if (error) {
        console.log("Error updating District data in server.js: ", error);
        return res.status(500).send("Error updating District data");
      } else {
        return res.sendStatus(200);
      }
    });

};

module.exports = { getMyApplications, getLocalApplications, editApoimentTime };
