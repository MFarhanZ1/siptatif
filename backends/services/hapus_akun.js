const db = require("../config/db");

const hapus_akun_koordinator_ta = async (req, res) => {
    const { email } = req.params;

    try {
        const results = await db.query("DELETE FROM akun WHERE email = $1", [email]);
        if (results.rowCount === 0) {
            return res.status(400).json({
                response: false,
                message: "Maaf, proses delete gagal, data akun yang anda pilih tidak ditemukan!"
            });
        }
        return res.status(200).json({
            response: true,
            message: "Berhasil menghapus data akun yang anda pilih!",
        })
    } catch(error) {
        return res.status(500).json({
            response: false,
            message: "Waduh, terjadi kesalahan pada server kami!"
        });
    }

}

module.exports = {
    hapus_akun_koordinator_ta
}