const express = require("express");
const router = express.Router();

// const Middleware = require("../controller/Middleware");
const MainAdmin = require("../../Controller/Admin/MainAdmin");

router.route("/main-admin-login").post(MainAdmin.mainAdminLogin);

module.exports = router;
