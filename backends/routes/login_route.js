// importing express built in library
const app = require("express");
const router = app.Router(); // importing express router

// importing services
const { 
    verifikasi_login, 
    verifikasi_login_mobile
} = require("../services/login");

// list available routes in login features
router.post(
    "/login", 
    verifikasi_login
);
router.post(
    "/mobile/login", 
    verifikasi_login_mobile
);

// export all defined router
module.exports = router;