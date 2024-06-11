// importing express built in library
const app = require("express");
const router = app.Router(); // importing express router

// importing services
const { 
    kirim_link_lupa_password,
    verifikasi_token_lupa_password,
    reset_password
} = require("../services/lupa_password");

// list available routes in login features
router.post("/kirim-link-lupa-password", kirim_link_lupa_password);
router.post("/verifikasi-token-lupa-password", verifikasi_token_lupa_password);
router.post("/reset-password", reset_password);

// export all defined router
module.exports = router;