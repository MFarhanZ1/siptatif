const jwt = require('jsonwebtoken');

const verifikasi_access_token = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1];

    if (!token) return res.status(401).json({
        response: false,
        message: 'Maaf, anda harus login terlebih dahulu!'
    });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({
            response: false,
            message: err.name === 'TokenExpiredError' ? 'Sesi anda sudah habis, silahkan generate akses token baru dengan refresh token anda kembali!' : 'Hayo deck, mau ngapain kmuh aowkaowk! heker yh banh? 😜😜'
        });
        next();
    });
};

module.exports = {
    verifikasi_access_token
};