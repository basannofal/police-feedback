const conn = require("../../Database/conn");

const addStation = (req, res) => {
    const { station_name, email, password, address, number, district_id } = req.body;
    console.log(req.body)
    if (!district_id) {
        return res.status(400).json({ error: "district id is required" })
    }
    const sql =
        "INSERT INTO rj_local_station  (station_name,email,password,address,number,district_id) VALUES (?,?,?,?,?,?)";
    const data = [station_name, email, password, address, number, district_id];
    console.log(data)
    conn.query(sql, data, (err, result) => {
        if (err) {
            console.error("Error adding record:", err);
            res.status(500).json({ error: "Error adding record" });
        } else {
            console.log("Records added: " + result.affectedRows);
            res.sendStatus(200);
        }
    });
}

const getStationData = (req, res) => {
    const sql = 'SELECT * FROM rj_local_station';
    conn.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
}


const deleteStation = (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM rj_local_station WHERE id=${id}`;
    conn.query(sql, (error) => {
        if (error) {
            console.log("Error Delete District Data in server.js" + error);
        }
        res.sendStatus(200);
    });

}


const getStationForEdit = (req, res) => {
    let id = req.params.id;
    const sql = `SELECT * FROM rj_local_station WHERE id=${id}`;
    conn.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
}


const editStationData = (req, res) => {
    let id = req.params.id;
    const { station_name, email, password, address, number, district_id } = req.body;
    const sql = "UPDATE rj_local_station SET station_name=?,email=?,password=?,address=?,number=?,district_id=? WHERE id=?";
    const data = [station_name, email, password, address, number, district_id, id];

    conn.query(sql, data, (error) => {
        if (error) {
            console.log("Error updating station data in server.js: ", error);
            return res.status(500).send("Error updating station data");
        } else {
            return res.sendStatus(200);
        }
    });
}





module.exports = { addStation, getStationData, deleteStation, getStationForEdit, editStationData };