const express = require("express");
const app = express();
const conn = require("./Database/conn");
const bodyParser = require("body-parser");
const cors = require("cors");
const CitizenRoutes = require("./Routes/Client/Citizen/CitizenRoute");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

// Routes
app.use("/", CitizenRoutes);

app.listen(1010, () => {
  console.log("SERVER CREATED AT 1010");
});
