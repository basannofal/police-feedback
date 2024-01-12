const conn = require("../../Database/conn");


//ADD CONATCT DATA
const addDistrict = (req, res) => {
    const { district_name, email, password, address, number } = req.body;
    const sql =
        "INSERT INTO rj_district (district_name,email,password,address,number) VALUES (?,?,?,?,?)";
    const data = [district_name, email, password, address, number];
    conn.query(sql, data, (err, result) => {
        if (err) {
            console.error("Error adding record:", err);
            res.status(500).json({ error: "Error adding record" });
        } else {
            console.log("Records added: " + result.affectedRows);
            res.sendStatus(200);
        }
    });
};

const getAllData = (req, res) => {
    const sql = 'SELECT * FROM rj_district';
    conn.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
}

//delete district data

const deleteDistrict = (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM rj_district WHERE id=${id}`;
    conn.query(sql, (error) => {
        if (error) {
            console.log("Error Delete District Data in server.js" + error);
        }
        res.sendStatus(200);
    });

}

const getDistrictForEdit = (req, res) => {
    let id = req.params.id;
    const sql = `SELECT * FROM rj_district WHERE id=${id}`;
    conn.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
}


const editDistData = (req, res) => {
    let id = req.params.id;
    const { district_name, email, password, address, number } = req.body;
    const sql = "UPDATE rj_district SET district_name=?,email=?,password=?,address=?,number=? WHERE id=?";
    const data = [district_name, email, password, address, number, id];

    conn.query(sql, data, (error) => {
        if (error) {
            console.log("Error updating District data in server.js: ", error);
            return res.status(500).send("Error updating District data");
        } else {
            return res.sendStatus(200);
        }
    });
}




module.exports = { addDistrict, getAllData, deleteDistrict, getDistrictForEdit, editDistData };