// importing express built in library
const app = require("express");
const router = app.Router(); // importing express router

// importing middleware
const validasi_email = require('../middlewares/validasi_email');

// importing services
const { 
    verifikasi_token, 
    kirim_link_verifikasi, 
    register_akun_mahasiswa
} = require('../services/register');

// list available routes in register features
router.post("/kirim-link-verifikasi", validasi_email, kirim_link_verifikasi);
router.post("/verifikasi-token", verifikasi_token);
router.post("/register", register_akun_mahasiswa);

// export all defined router
module.exports = router;