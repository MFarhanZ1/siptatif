// importing express built in library
const app = require("express");
const router = app.Router(); // importing express router

// importing services
const { 
    refresh_access_token
} = require("../services/jwt_auth");

// list available routes in login features
router.post(
    "/refresh-access-token", 
    refresh_access_token
);

// export all defined router
module.exports = router;