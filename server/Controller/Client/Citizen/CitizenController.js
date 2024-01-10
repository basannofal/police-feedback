const conn = require("../../../Database/conn");
const twilio = require("twilio");

// Twilio credentials
const accountSid = "ACa99f7e636f920b0fea25afac9c1485ce";
const authToken = "4d1bfa85032b262d31a0c43be057af59";
const client = new twilio(accountSid, authToken);

// Map to store OTPs (replace with a database in a production environment)
let otpMap = new Map();

// Function to send OTP
const sendOTP = (req, res) => {
  const { phoneNumber } = req.body;

  // Generate a random 4-digit OTP
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  // Save OTP in memory (replace with a database in a production environment)
  otpMap.set(phoneNumber, otp);

  const messageBody = `Dear user, 
Your OTP for People_Helps verification is: ${otp}. 
Please do not share this OTP with anyone. 
Thank you for choosing People_Helps.`;

  client.messages
    .create({
      body: messageBody,
      to: `+91${phoneNumber}`,
      from: "+19706390566",
    })
    .then((message) => {
      console.log(`OTP sent successfully to ${message.to}`);
      res.status(200).send({ success: true });
    })
    .catch((error) => {
      console.error(`Error sending OTP: ${error}`);
      res.status(500).send({ success: false, error: error.message });
    });
};

// Function to verify OTP
const verifyOTP = (req, res) => {
  const { phoneNumber, otp } = req.body;

  // Retrieve the saved OTP from memory (replace with a database in a production environment)
  const storedOtp = otpMap.get(phoneNumber);

  if (storedOtp && storedOtp === otp) {
    // Correct OTP
    res.status(200).send({ success: true });
  } else {
    // Incorrect OTP
    res.status(400).send({ success: false, error: "Invalid OTP" });
  }
};

const citizenRegister = async (req, res) => {
  const {
    firstName,
    middleName,
    surname,
    email,
    phoneNumber,
    otp,
    password,
    confirmPassword,
  } = req.body;

  const insertQuery =
    "INSERT INTO `rj_citizen_register`(`fname`, `mname`, `surname`, `number`,  `email`, `password`, `c_password`) VALUES (?, ?, ?, ?, ?, ?, ?)";

  const values = [
    firstName,
    middleName,
    surname,
    phoneNumber,
    email,
    password,
    confirmPassword,
  ];
  conn.query(insertQuery, values, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error adding citizen data");
    } else {
      return res.status(200).send("your registration successfully");
    }
  });
};

const citizenLogin = async (req, res) => {
  const { email, password } = req.body;

  // Check if the provided email and password match the records in the database
  const query = `SELECT * FROM rj_citizen_register WHERE email = ? AND password = ?`;
  conn.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).json({ success: false, error: "Internal server error" });
      return;
    }

    if (results.length === 0) {
      res.status(200).json({ success: false, error: "Invalid credentials" });
      return;
    } else {
      const citizen = results[0];
      res
        .status(200)
        .json({ success: true, message: "Citizen login successful", citizen });
    }
  });
};

module.exports = { sendOTP, verifyOTP, citizenRegister, citizenLogin };