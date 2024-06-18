// importing express built in library
const app = require("express");
const router = app.Router(); // importing express router

// importing services
const { 
    getAllPengumuman,
    getPengumumanRoleBased,
    createPengumuman,
    updatePengumuman,
    deletePengumuman
} = require("../controllers/pengumuman_controller");

// importing middleware
const { verifikasi_access_token } = require("../middlewares/jwt_auth_middleware");
const { forbiden_for_mahasiswa_only } = require("../middlewares/authorization_middleware");

// list available routes in pengumuman features
router.get(
    "/list-pengumuman",
    getAllPengumuman
);
router.get(
    "/pengumuman",
    verifikasi_access_token,
    forbiden_for_mahasiswa_only,
    getPengumumanRoleBased
)
router.post(
    "/pengumuman",
    verifikasi_access_token,
    forbiden_for_mahasiswa_only,
    createPengumuman
)
router.put(
    "/pengumuman/:id",
    verifikasi_access_token,
    forbiden_for_mahasiswa_only,
    updatePengumuman
)
router.delete(
    "/pengumuman/:id",
    verifikasi_access_token,
    forbiden_for_mahasiswa_only,
    deletePengumuman
)

// export all defined router
module.exports = router;