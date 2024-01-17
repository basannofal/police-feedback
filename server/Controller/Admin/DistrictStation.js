const conn = require("../../Database/conn");

const getDistrictStation = (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM rj_local_station WHERE district_id=${id}`;
    conn.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
}


module.exports = { getDistrictStation };