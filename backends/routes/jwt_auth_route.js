// importing express built in library
const app = require("express");
const router = app.Router(); // importing express router

// importing services
const { 
    refresh_access_token,
    refresh_access_token_mobile
} = require("../services/jwt_auth");
const { verifikasi_access_token } = require("../middlewares/jwt_auth_middleware");

// list available routes in login features
router.post(
    "/refresh-access-token", 
    refresh_access_token
);
router.post(
    "mobile/refresh-access-token", 
    refresh_access_token_mobile
);

router.post(
    "/verify-access-token",
    verifikasi_access_token,
    (req, res) => {
        res.status(200).json({
            response: true,
            message: "access token is verified",
            role: req.user.role
        })
    }
);

// export all defined router
module.exports = router;