const logout = (req, res) => {

    if (!req.cookies?.refreshToken) return res.status(401).json({
        response: false,
        message: 'Apanya yang mau di logout bro hadeh, login aja ente belum!'
    })
    
    res.clearCookie('refreshToken');

    res.status(200).json({ 
        response: true,
        message: 'Logout anda telah berhasil, kini anda akan dikembalikan ke halaman login!' 
    });
};

module.exports = {
    logout
}