const conn = require("../../../Database/conn");
const nodemailer = require("nodemailer");

const getMyApplications = (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const sql = "SELECT * FROM rj_citizen_complaint where user_id = ?";
  conn.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    console.log(data);
    return res.json(data);
  });
};

const getLocalApplications = (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const sql = "SELECT * FROM rj_citizen_complaint where local_id = ?";
  conn.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    console.log(data);
    return res.json(data);
  });
};

const editApoimentTime = async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const currentDate = new Date();

  // Extract date components
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
  const day = currentDate.getDate();

  // Format the date as "YYYY-MM-DD"
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  // Extract time components
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // Format the time as "HH:MM:SS"
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  let { cid, id } = req.params;
  try {
    const getData = (id) => {
      return new Promise((resolve, reject) => {
        const selectQuery = "SELECT * FROM rj_citizen_register where id = ?";
        conn.query(selectQuery, [id], (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      });
    };

    // Use await to wait for the asynchronous query result
    const Namedata = await getData(id);
    const name = Namedata[0].fname;
    const email = Namedata[0].email;
    const { appointment_date, appointment_time } = req.body;
    const sql =
      "UPDATE `rj_citizen_complaint` SET `status`= ?, `raw_fir_date`= ?, `raw_fir_time`= ?, `appointment_date`= ?, `appointment_time`= ?  WHERE id=?";
    const data = [
      1,
      formattedDate,
      formattedTime,
      appointment_date,
      appointment_time,
      cid,
    ];

    conn.query(sql, data, (error) => {
      if (error) {
        console.log("Error updating District data in server.js: ", error);
        return res.status(500).send("Error updating District data");
      } else {
        return res.sendStatus(200);
      }
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "sunasarahusenahmad07@gmail.com", // Your email
        pass: "evwd ocgp ojwh oich",
      },
    });

    console.log(name + email);
    const mailOptions = {
      from: "sunasarahusenahmad07@gmail.com",
      to: email,
      subject: "Apoiment Latter",
      text: `Hello, ${name} \n \n you application succesfully seen by police and take action for your complaint \n visit our station and verify your identity \n\n Appointment Date : ${appointment_date} \n Appointment Time : ${appointment_time}`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error " + error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const editVerfiy = async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const currentDate = new Date();

  // Extract date components
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
  const day = currentDate.getDate();

  // Format the date as "YYYY-MM-DD"
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  // Extract time components
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // Format the time as "HH:MM:SS"
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  let { cid, id } = req.params;
  try {
    const getData = (id) => {
      return new Promise((resolve, reject) => {
        const selectQuery = "SELECT * FROM rj_citizen_register where id = ?";
        conn.query(selectQuery, [id], (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      });
    };

    // Use await to wait for the asynchronous query result
    const Namedata = await getData(id);
    const name = Namedata[0].fname;
    const email = Namedata[0].email;
    const sql =
      "UPDATE `rj_citizen_complaint` SET `status`= ?, `verify_date`= ?, `verify_time`= ?  WHERE id=?";
    const data = [2, formattedDate, formattedTime, cid];

    conn.query(sql, data, (error) => {
      if (error) {
        console.log("Error updating District data in server.js: ", error);
        return res.status(500).send("Error updating District data");
      } else {
        return res.sendStatus(200);
      }
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "sunasarahusenahmad07@gmail.com", // Your email
        pass: "evwd ocgp ojwh oich",
      },
    });

    console.log(name + email);
    const mailOptions = {
      from: "sunasarahusenahmad07@gmail.com",
      to: email,
      subject: "Complaint Verification Latter",
      text: `Hello, ${name} \n \n you FIR succesfully Verifed by police and be patiant we are working start on your complaint  \n Thank you for your patiant \n\n Police Team`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error " + error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const editRejectByPolice = async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const currentDate = new Date();

  // Extract date components
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
  const day = currentDate.getDate();

  // Format the date as "YYYY-MM-DD"
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  // Extract time components
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // Format the time as "HH:MM:SS"
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  let { cid, id } = req.params;
  try {
    const getData = (id) => {
      return new Promise((resolve, reject) => {
        const selectQuery = "SELECT * FROM rj_citizen_register where id = ?";
        conn.query(selectQuery, [id], (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      });
    };

    // Use await to wait for the asynchronous query result
    const Namedata = await getData(id);
    const name = Namedata[0].fname;
    const email = Namedata[0].email;
    const userId = Namedata[0].id;

    const { feedbackData } = req.body;

    const sql =
      "UPDATE `rj_citizen_complaint` SET `status`= ?, `verify_date`= ?, `verify_time`= ? , `msg`= ?  WHERE id=?";
    const data = [4, formattedDate, formattedTime, feedbackData, cid];

    conn.query(sql, data, (error) => {
      if (error) {
        console.log("Error updating District data in server.js: ", error);
        return res.status(500).send("Error updating District data");
      } else {
        return res.sendStatus(200);
      }
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "sunasarahusenahmad07@gmail.com", // Your email
        pass: "evwd ocgp ojwh oich",
      },
    });

    console.log(name + email);
    const mailOptions = {
      from: "sunasarahusenahmad07@gmail.com",
      to: email,
      subject: "Reject Complaint",
      text: `Hello, ${name} \n \n Your compalaint Rejected by this Reason\n Reason : ${feedbackData}\n\n if you feel free then contact any other inquiry \n\n give feedback for batter work and we can improve our system \n feedback Link:- http://localhost:3000/feedback-page/${userId}`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error " + error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const editRejectByUser = async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const currentDate = new Date();

  // Extract date components
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
  const day = currentDate.getDate();

  // Format the date as "YYYY-MM-DD"
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  // Extract time components
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // Format the time as "HH:MM:SS"
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  let { cid, id } = req.params;
  try {
    const getData = (id) => {
      return new Promise((resolve, reject) => {
        const selectQuery = "SELECT * FROM rj_citizen_register where id = ?";
        conn.query(selectQuery, [id], (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      });
    };

    // Use await to wait for the asynchronous query result
    const Namedata = await getData(id);
    const name = Namedata[0].fname;
    const email = Namedata[0].email;
    const userId = Namedata[0].id;

    const { feedbackData } = req.body;

    const sql =
      "UPDATE `rj_citizen_complaint` SET `status`= ?, `verify_date`= ?, `verify_time`= ? , `msg`= ?  WHERE id=?";
    const data = [5, formattedDate, formattedTime, feedbackData, cid];

    conn.query(sql, data, (error) => {
      if (error) {
        console.log("Error updating District data in server.js: ", error);
        return res.status(500).send("Error updating District data");
      } else {
        return res.sendStatus(200);
      }
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "sunasarahusenahmad07@gmail.com", // Your email
        pass: "evwd ocgp ojwh oich",
      },
    });

    console.log(name + email);
    const mailOptions = {
      from: "sunasarahusenahmad07@gmail.com",
      to: email,
      subject: "Reject Complaint",
      text: `Hello, ${name} \n \n Your compalaint Rejected by this Reason\n Reason : ${feedbackData}\n\n if you feel free then contact any other inquiry \n\n give feedback for batter work and we can improve our system \n feedback Link:- http://localhost:3000/feedback-page/${userId}`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error " + error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const editsuccess = async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const currentDate = new Date();

  // Extract date components
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
  const day = currentDate.getDate();

  // Format the date as "YYYY-MM-DD"
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  // Extract time components
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // Format the time as "HH:MM:SS"
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  let { cid, id } = req.params;
  try {
    const getData = (id) => {
      return new Promise((resolve, reject) => {
        const selectQuery = "SELECT * FROM rj_citizen_register where id = ?";
        conn.query(selectQuery, [id], (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      });
    };

    // Use await to wait for the asynchronous query result
    const Namedata = await getData(id);
    const name = Namedata[0].fname;
    const email = Namedata[0].email;
    const userId = Namedata[0].id;

    const sql =
      "UPDATE `rj_citizen_complaint` SET `status`= ?, `complete_date`= ?, `complete_time`= ?  WHERE id=?";
    const data = [3, formattedDate, formattedTime, cid];

    conn.query(sql, data, (error) => {
      if (error) {
        console.log("Error updating District data in server.js: ", error);
        return res.status(500).send("Error updating District data");
      } else {
        return res.sendStatus(200);
      }
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "sunasarahusenahmad07@gmail.com", // Your email
        pass: "evwd ocgp ojwh oich",
      },
    });

    console.log(name + email);
    const mailOptions = {
      from: "sunasarahusenahmad07@gmail.com",
      to: email,
      subject: "Apoiment Latter",
      text: `Hello, ${name} \n \n your Complaint succesfully Solved by our police team and thank you for being patiant\n are we helpful for you ? \n\n give our feedback and if you want to give any suggestion give please \n\n feedback Link:- http://localhost:3000/feedback-page/${userId}`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error " + error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getMyApplications,
  getLocalApplications,
  editApoimentTime,
  editVerfiy,
  editRejectByPolice,
  editRejectByUser,
  editsuccess,
};
