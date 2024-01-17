const conn = require("../../Database/conn");

const getAllFeedback = (req, res) => {
    const sql = `SELECT * FROM rj_local_feedback`;
    conn.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
}

module.exports = { getAllFeedback };