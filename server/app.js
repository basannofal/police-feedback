const express = require("express");
const app = express();
const conn = require("./Database/conn");
const bodyParser = require("body-parser");
const cors = require("cors");
const CitizenRoutes = require("./Routes/Client/Citizen/CitizenRoute");
const DistrictRoutes = require("./Routes/Admin/DistrictRoute")
const StationRoutes = require("./Routes/Admin/StationRoute")

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

// Routes
app.use("/", CitizenRoutes);
app.use("/", DistrictRoutes);
app.use("/", StationRoutes);

app.listen(1010, () => {
  console.log("SERVER CREATED AT 1010");
});