const conn = require("../../../Database/conn");

const getContact = (req,res) => {
    const sql = 'SELECT * FROM rj_district'
    conn.query(sql, (err, data) => {
        if (err) return res.json(err);  
        return res.json(data);
    });
}

const getContactStation = (req,res) => {
    const sql = 'SELECT * FROM rj_local_station'
    conn.query(sql, (err, data) => {
        if (err) return res.json(err);  
        return res.json(data);
    });
}

module.exports = { getContact,getContactStation };