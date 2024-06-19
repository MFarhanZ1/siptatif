// importing express built in library
const app = require("express");
const { verifikasi_access_token } = require("../middlewares/jwt_auth_middleware");
const { forbiden_for_mahasiswa_only } = require("../middlewares/authorization_middleware");
const { getDosen } = require("../controllers/dosen_controller");
const { getPembimbing } = require("../controllers/pembimbing_controller");
const router = app.Router(); // importing express router

// ===============================================


// list public information that can be accesed by multiple roles
router.get(
    "/dosen",
    verifikasi_access_token,
    forbiden_for_mahasiswa_only,
    getDosen
)
router.get(
    "/pembimbing",
    verifikasi_access_token,
    getPembimbing
)

// ===============================================

// export all defined router
module.exports = router;