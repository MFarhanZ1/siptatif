// importing express built in library
const app = require("express");
const router = app.Router(); // importing express router

// importing middlewares
const {
    email_sudah_terdaftar,
    link_reset_password_belum_pernah_terkirim,
    link_reset_password_sudah_di_tekan_dan_sesi_belum_habis
} = require("../middlewares/lupa_password_middleware");

// importing services
const { 
    kirim_link_lupa_password,
    verifikasi_token_lupa_password,
    reset_password
} = require("../services/lupa_password");
const { koordinator_ta_only } = require("../middlewares/authorization_middleware");

// list available routes in login features
router.post(
    "/kirim-link-lupa-password", 
    email_sudah_terdaftar, 
    link_reset_password_belum_pernah_terkirim,
    kirim_link_lupa_password
);
router.post(
    "/mobile/koor-ta/kirim-link-lupa-password", 
    email_sudah_terdaftar, 
    link_reset_password_belum_pernah_terkirim,
    koordinator_ta_only,
    kirim_link_lupa_password
);
router.post(
    "/verifikasi-token-lupa-password", 
    verifikasi_token_lupa_password
);
router.post(
    "/reset-password", 
    email_sudah_terdaftar,
    link_reset_password_sudah_di_tekan_dan_sesi_belum_habis,
    reset_password
);

// export all defined router
module.exports = router;