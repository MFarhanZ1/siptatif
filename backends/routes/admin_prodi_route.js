// importing express built in library
const app = require("express");
const router = app.Router(); // importing express router

// ===============================================

/**
 * DOSEN SUB MENU CONTROLLER
 */

// importing controller crud kelola dosen
const { 
    createDosen,
    updateDosen,
    deleteDosen
} = require("../controllers/dosen_controller");

// importting controller crud kelola keahlian
const { 
    getKeahlian,
    getKeahlianDosen,
    createKeahlianDosen,
    deleteKeahlianDosen
} = require("../controllers/keahlian_controller");

// importing service for kelola jabatan dosen
const {
    register_akun_koordinator_ta
} = require("../services/register")
const { 
    hapus_akun_koordinator_ta 
} = require("../services/hapus_akun");

// ===============================================

// importing middleware
const {
    verifikasi_access_token
} = require("../middlewares/jwt_auth_middleware");
const {
    admin_prodi_only
} = require("../middlewares/authorization_middleware");

// ===============================================

/**
 * DOSEN SUB MENU ROUTE
 */

// list available routes in admin_prodi features to dosen
router.post(
    "/dosen", 
    verifikasi_access_token, 
    admin_prodi_only,
    createDosen
)
router.put(
    "/dosen/:nidn", 
    verifikasi_access_token, 
    admin_prodi_only,
    updateDosen
)
router.delete(
    "/dosen/:nidn", 
    verifikasi_access_token, 
    admin_prodi_only,
    deleteDosen
)

// list available routes in admin_prodi features to keahlian
router.get(
    "/keahlian", 
    verifikasi_access_token,
    admin_prodi_only, 
    getKeahlian
)
router.get(
    "/keahlian-dosen", 
    verifikasi_access_token, 
    admin_prodi_only,
    getKeahlianDosen
)
router.post(
    "/keahlian-dosen", 
    verifikasi_access_token, 
    admin_prodi_only,
    createKeahlianDosen
)
router.delete(
    "/keahlian-dosen/:nidn", 
    verifikasi_access_token, 
    admin_prodi_only,
    deleteKeahlianDosen
)

// list available routes in admin_prodi features for managing koordinator ta akun based on dosen data
router.post(
    "/register-koordinator-ta",
    verifikasi_access_token,
    admin_prodi_only,
    register_akun_koordinator_ta
)
router.delete(
    "/register-koordinator-ta/:email",
    verifikasi_access_token,
    admin_prodi_only,
    hapus_akun_koordinator_ta
)

// ===============================================

// export all defined router
module.exports = router;