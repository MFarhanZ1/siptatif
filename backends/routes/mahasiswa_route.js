// importing express built in library
const app = require("express");
const router = app.Router(); // importing express router

const { verifikasi_access_token } = require("../middlewares/jwt_auth_middleware");
const { mahasiswa_only } = require("../middlewares/authorization_middleware");  
const { createTugasAkhir, getTugasAkhirInfoForMahasiswa } = require("../controllers/tugas_akhir_controller");

// ===============================================

router.post(
    "/tugas-akhir", 
    verifikasi_access_token,
    mahasiswa_only,
    createTugasAkhir
)
router.get(
    "/tugas-akhir-info",
    verifikasi_access_token,
    mahasiswa_only,
    getTugasAkhirInfoForMahasiswa
)

// ===============================================

// export all defined router
module.exports = router;