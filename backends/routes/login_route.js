// importing express built in library
const app = require("express");
const router = app.Router(); // importing express router

// importing services
const { 
    verifikasi_login 
} = require("../services/login");

// list available routes in login features
router.post(
    "/login", 
    verifikasi_login
);

// export all defined router
module.exports = router;