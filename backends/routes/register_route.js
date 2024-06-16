// importing express built in library
const app = require("express");
const router = app.Router(); // importing express router

// importing middleware
const {
    only_email_students_usr,
    email_belum_terdaftar,
    link_verifikasi_email_sudah_di_tekan_dan_sesi_belum_habis
} = require("../middlewares/register_middleware");

// importing services
const { 
    verifikasi_token_register, 
    kirim_link_verifikasi, 
    register_akun_mahasiswa,
    register_akun_admin_prodi
} = require('../services/register');

// list available routes in register features
router.post(
    "/kirim-link-verifikasi", 
    only_email_students_usr, 
    email_belum_terdaftar, 
    kirim_link_verifikasi
);
router.post(
    "/verifikasi-token-register", 
    verifikasi_token_register
);
router.post(
    "/register", 
    email_belum_terdaftar, 
    link_verifikasi_email_sudah_di_tekan_dan_sesi_belum_habis,
    register_akun_mahasiswa
);
router.post(
    "/register-admin-prodi", 
    email_belum_terdaftar,
    register_akun_admin_prodi
);

// export all defined router
module.exports = router;