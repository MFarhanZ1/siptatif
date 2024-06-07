const validasi_email = (req, res, next) => {
    const {email} = req.body;
    const emailRegexUSR = /^[a-zA-Z0-9._%+-]+@students\.uin-suska\.ac\.id$/;
    
    if (!emailRegexUSR.test(email)) {
        return res.status(400).json({ 
            response: false,
            message: 'Maaf, hanya email khusus mahasiswa UIN Suska Riau yang dapat digunakan untuk mendaftar!' 
        });
    }

    next();
}

module.exports = validasi_email;