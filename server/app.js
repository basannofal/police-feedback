const express = require("express");
const app = express();
const conn = require("./Database/conn");
const bodyParser = require("body-parser");
const cors = require("cors");
const CitizenRoutes = require("./Routes/Client/Citizen/CitizenRoute");
const MainAdminRoutes = require("./Routes/Admin/MainAdminRoute");
const DistrictRoutes = require("./Routes/Admin/DistrictRoute");
const StationRoutes = require("./Routes/Admin/StationRoute");
const DistrictAdminRoute = require("./Routes/Admin/DistrictAdminRoute");
const LocalAdminRoute = require("./Routes/Admin/LocalAdminRoute");
const EmergencyComplaint = require("./Routes/Client/EmergencyComplaint/EmergencyComplaintRoute");
const Feedback = require("./Routes/Client/Feedback/FeedbackRoute")
const Complaint = require("./Routes/Client/complaints/complaintRoute")
const MyapplicationRoute = require("./Routes/Client/myapplication/MyapplicationRoute");
const ContactRoute = require("./Routes/Client/Contact/ContactRoute")
const FeedbackRoute = require("./Routes/Admin/FeedbackRoute")
const AllFeedbackRoute = require("./Routes/Admin/AllFeedbackRoute")


app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

// Routes
app.use("/", CitizenRoutes);
app.use("/", MainAdminRoutes);
app.use("/", DistrictRoutes);
app.use("/", StationRoutes);
app.use("/", DistrictAdminRoute);
app.use("/", LocalAdminRoute);
app.use("/", Feedback);
app.use("/", Complaint);
app.use("/", EmergencyComplaint);
app.use("/", MyapplicationRoute);
app.use("/", ContactRoute);
app.use("/", FeedbackRoute);
app.use("/", AllFeedbackRoute);


app.listen(1010, () => {
  console.log("SERVER CREATED AT 1010");
});
