const jwt = require("jsonwebtoken");
const db = require("../config/db");

require("dotenv").config();

const refresh_access_token = (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) return res.status(401).json({
        response: false,
        message: "Maaf, sesi anda sudah habis, silahkan login kembali!",
    });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(403).json({
            response: false,
            message: err.name === 'TokenExpiredError' ? 'Sesi anda sudah habis, silahkan generate akses token baru dengan refresh token anda kembali!' : 'Hayo deck, mau ngapain kmuh aowkaowk! heker yh banh? 😜😜'
        });

        const results = await db.query(
            `SELECT * FROM view_detail_akun WHERE email = $1`,
            [user.email]
        );

        const accessToken = jwt.sign(
            {
                email: results.rows[0].email,
                nim: results.rows[0].nim,
                nama: results.rows[0].nama,
                role: results.rows[0].role,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_LIFETIME }
        );

        return res.status(200).json({
            response: true,
            accessToken: accessToken,
            message:
                "Yeay, verifikasi token sukses! akses token anda berhasil kembali dibuat coy.",
        });
    });
};

module.exports = {
    refresh_access_token,
}
