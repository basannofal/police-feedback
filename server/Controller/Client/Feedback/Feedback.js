const conn = require("../../../Database/conn");

const addFeedback = (req, res) => {
    const { ans_1, ans_2, ans_3, ans_4, ans_5, did, sid, ans_6 } = req.body;
    console.log(req.body);
    const sql = "INSERT INTO rj_login_feedback (ans_1, ans_2, ans_3, ans_4, ans_5,did,sid, ans_6) VALUES (?,?,?, ?, ?, ?, ?, ?)";
    const data = [ans_1, ans_2, ans_3, ans_4, ans_5, did, sid, ans_6];

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

const addLocalFeedback = (req, res) => {
    const { ans_1, ans_2, ans_3 } = req.body;
    const sql = "INSERT INTO rj_local_feedback (ans_1, ans_2, ans_3) VALUES (?, ?, ?)";
    const data = [ans_1, ans_2, ans_3];

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



module.exports = { addFeedback, addLocalFeedback };
