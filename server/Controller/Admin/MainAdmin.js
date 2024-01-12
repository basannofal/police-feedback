const conn = require("../../Database/conn");

const mainAdminLogin = async (req, res) => {
  const { email, password } = req.body;

  // Check if the provided email and password match the records in the database
  const query = `SELECT * FROM rj_admin WHERE email = ? AND password = ?`;
  conn.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).json({ success: false, error: "Internal server error" });
      return;
    }

    if (results.length === 0) {
      res
        .status(200)
        .json({ success: false, error: "Invalid Admin Credentials" });
      return;
    } else {
      const main_admin = results[0];
      res
        .status(200)
        .json({
          success: true,
          message: "Main Admin login successful",
          main_admin,
        });
    }
  });
};

module.exports = { mainAdminLogin };
