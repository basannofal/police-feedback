const conn = require("../../Database/conn");

const getFeedback = (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM rj_login_feedback WHERE sid=${id}`;
    conn.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
}

const getCitizenFeedback = (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM rj_login_feedback`;
    conn.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
}

module.exports = { getFeedback, getCitizenFeedback };