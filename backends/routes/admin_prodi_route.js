// importing express built in library
const app = require("express");
const router = app.Router(); // importing express router

// importing services
const { 
    getAllDosen,
    getDosenByNIDN,
    createDosen,
    updateDosen,
    deleteDosen
} = require("../controllers/dosen_controller");

// importing middleware
const {
    verifikasi_access_token
} = require("../middlewares/jwt_auth_middleware");
const {
    admin_prodi_only
} = require("../middlewares/authorization_middleware");

// list available routes in admin_prodi features
router.get(
    "/dosen", 
    verifikasi_access_token,
    admin_prodi_only, 
    getAllDosen
)
router.get(
    "/dosen/:nidn", 
    verifikasi_access_token, 
    admin_prodi_only,
    getDosenByNIDN
)
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

// export all defined router
module.exports = router;