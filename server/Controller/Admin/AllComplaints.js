const conn = require("../../Database/conn");

const getAllComplaints = (req, res) => {
    const sql = `SELECT * FROM rj_citizen_complaint`;
    conn.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
}

module.exports = { getAllComplaints };