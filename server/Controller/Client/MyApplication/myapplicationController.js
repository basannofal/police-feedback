const conn = require("../../../Database/conn");


const getMyApplications = (req, res) => {
    console.log(req.params);
    const {id} = req.params;
    const sql = 'SELECT * FROM rj_citizen_complaint where user_id = ?';
    conn.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        console.log(data);
        return res.json(data);
    });
}


module.exports = { getMyApplications };
