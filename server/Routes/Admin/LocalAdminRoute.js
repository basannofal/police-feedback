const express = require("express");
const router = express.Router();

// const Middleware = require("../controller/Middleware");
const LocalAdmin = require("../../Controller/Admin/LocalAdmin");

router.route("/local-admin-login").post(LocalAdmin.localAdminLogin);

module.exports = router;
