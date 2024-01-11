const conn = require("../../Database/conn");

const localAdminLogin = async (req, res) => {
  const { email, password } = req.body;

  // Check if the provided email and password match the records in the database
  const query = `SELECT * FROM rj_local_station WHERE email = ? AND password = ?`;
  conn.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).json({ success: false, error: "Internal server error" });
      return;
    }

    if (results.length === 0) {
      res
        .status(200)
        .json({
          success: false,
          error: "Invalid Local Police Admin Credentials",
        });
      return;
    } else {
      const local_admin = results[0];
      res.status(200).json({
        success: true,
        message: "Local Police Admin login successful",
        local_admin,
      });
    }
  });
};

module.exports = { localAdminLogin };
