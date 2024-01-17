const conn = require("../../Database/conn");

const getStationComplaint = (req, res) => {
    let id = req.params.id;
    const sql = `SELECT * FROM rj_citizen_complaint WHERE dist_id=${id}`;
    conn.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
}

module.exports = { getStationComplaint };