// importing express built in library
const app = require("express");
const router = app.Router(); // importing express router

// ===============================================

/**
 * DOSEN PENGUJI SUB MENU CONTROLLER
 */

// importing controller crud kelola dosen penguji
const { 
    createPenguji,
    updatePenguji,
    deletePenguji,
    getPenguji,
} = require("../controllers/penguji_controller");
const { 
    createPembimbing,
    updatePembimbing,
    deletePembimbing,
} = require("../controllers/pembimbing_controller");

// ===============================================

// importing middleware
const {
    verifikasi_access_token
} = require("../middlewares/jwt_auth_middleware");
const {
    koordinator_ta_only,
    forbiden_for_mahasiswa_only
} = require("../middlewares/authorization_middleware");

// ===============================================

/**
 * DOSEN SUB MENU ROUTER
 */

// list of available routes in penguji features
router.get(
    "/penguji", 
    verifikasi_access_token, 
    forbiden_for_mahasiswa_only,
    getPenguji
)
router.post(
    "/penguji", 
    verifikasi_access_token, 
    koordinator_ta_only,
    createPenguji
)
router.put(
    "/penguji/:nidn", 
    verifikasi_access_token, 
    koordinator_ta_only,
    updatePenguji
)
router.delete(
    "/penguji/:nidn", 
    verifikasi_access_token, 
    koordinator_ta_only,
    deletePenguji
)
// list of available routes in pembimbing features
router.post(
    "/pembimbing", 
    verifikasi_access_token, 
    koordinator_ta_only,
    createPembimbing
)
router.put(
    "/pembimbing/:nidn", 
    verifikasi_access_token, 
    koordinator_ta_only,
    updatePembimbing
)
router.delete(
    "/pembimbing/:nidn", 
    verifikasi_access_token, 
    koordinator_ta_only,
    deletePembimbing
)

// ===============================================

// export all defined router
module.exports = router;