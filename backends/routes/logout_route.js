// importing express built in library
const app = require("express");
const router = app.Router(); // importing express router

// importing services
const { 
    logout
} = require("../services/logout");

// list available routes in login features
router.post("/logout", logout);

// export all defined router
module.exports = router;