const jwt = require("jsonwebtoken");

const admin_prodi_only = (req, res, next) => {

    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (user.role === "Admin Prodi") {
            next();
        }        
    });

    return res.status(403).json({
        response: false,
        message: "Mau ngapain mas bro aowkowk, heker yh banh? 😜😜"
    });

}

const koordinator_ta_only = (req, res, next) => {

    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (user.role === "Koordinator TA") {
            next();
        }        
    });

    return res.status(403).json({
        response: false,
        message: "Mau ngapain mas bro aowkowk, heker yh banh? 😜😜"
    });

}

const mahasiswa_only = (req, res, next) => {

    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (user.role === "Mahasiswa") {
            next();
        }        
    });

    return res.status(403).json({
        response: false,
        message: "Mau ngapain mas bro aowkowk, heker yh banh? 😜😜"
    });

}

module.exports = {
    admin_prodi_only,
    koordinator_ta_only,
    mahasiswa_only
};