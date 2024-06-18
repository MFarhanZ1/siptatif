// importing express built in library
const app = require("express");
const router = app.Router(); // importing express router

// ===============================================

/**
 * DOSEN PENGUJI SUB MENU CONTROLLER
 */

// importing controller crud kelola dosen
const { 
    createPenguji,
    updatePenguji,
    deletePenguji,
    getPenguji,
} = require("../controllers/penguji_controller");

// ===============================================

// importing middleware
const {
    verifikasi_access_token
} = require("../middlewares/jwt_auth_middleware");
const {
    koordinator_ta_only
} = require("../middlewares/authorization_middleware");

// ===============================================

// list of available routes in penguji features
router.get(
    "/penguji", 
    verifikasi_access_token, 
    koordinator_ta_only,
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

// ===============================================

// export all defined router
module.exports = router;