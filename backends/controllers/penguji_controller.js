const db = require("../config/db");

const getPenguji = async (req, res) => {
    try {
        const results = await db.query("select vd.nidn, vd.nama, vd.keahlian, dp.kuota from view_detail_dosen vd, dosen_penguji dp where dp.nidn = vd.nidn");
        return res.status(200).json({
            response: true,
            message: "Berhasil memuat data penguji!",
            data: results.rows,
        });
    } catch (error) {
        return res.status(500).json({
            response: false,
            message: "Waduh, terjadi kesalahan pada server kami!",
        });
    }
};

const createPenguji = async (req, res) => {
    const { nidn, kuota } = req.body;
    if (!nidn) {
        return res.status(400).json({
            response: false,
            message: "Maaf, proses insert gagal, lengkapi data anda terlebih dahulu mas/mbak!",
        });
    }
    try {
        const results = await db.query("INSERT INTO dosen_penguji (nidn, kuota) VALUES ($1, $2)", [nidn, kuota]);
        if (results.rowCount === 0) {
            return res.status(400).json({
                response: false,
                message: "Maaf, proses insert gagal!",
            });
        }
        return res.status(200).json({
            response: true,
            message: "Berhasil menambahkan data penguji baru!",
        });
    } catch (error) {
        if (error.code === "23503") {
            return res.status(400).json({
                response: false,
                message: "Maaf, proses insert gagal, nidn yang anda pilih belum terdaftar di data dosen!",
            });
        } else if (error.code === "23505") {
            return res.status(400).json({
                response: false,
                message: "Maaf, proses insert gagal, data penguji yang anda pilih sudah terdaftar, kini anda cuman bisa menghapus dan memperbarui kuotanya saja!",
            });
        }
        return res.status(500).json({
            response: false,
            message: "Waduh, terjadi kesalahan pada server kami!",
        });
    }
}

const updatePenguji = async (req, res) => {
    const { nidn } = req.params;
    const { kuota } = req.body;
    if (!kuota) {
        return res.status(400).json({
            response: false,
            message: "Maaf, proses update gagal, lengkapi data anda terlebih dahulu mas/mbak!",
        });
    }
    try {
        const results = await db.query("UPDATE dosen_penguji SET kuota = $1 WHERE nidn = $2", [kuota, nidn]);
        if (results.rowCount === 0) {
            return res.status(400).json({
                response: false,
                message: "Maaf, proses update gagal, data penguji yang anda pilih tidak ditemukan!",
            });
        }
        return res.status(200).json({
            response: true,
            message: "Berhasil memperbarui data penguji terbaru!",
        });
    } catch (error) {
        return res.status(500).json({
            response: false,
            message: "Waduh, terjadi kesalahan pada server kami!",
        });
    }
}

const deletePenguji = async (req, res) => {
    const { nidn } = req.params;
    try {
        const results = await db.query("DELETE FROM dosen_penguji WHERE nidn = $1", [nidn]);
        if (results.rowCount === 0) {
            return res.status(400).json({
                response: false,
                message: "Maaf, proses delete gagal, data penguji yang anda pilih tidak ditemukan!",
            });
        }
        return res.status(200).json({
            response: true,
            message: "Berhasil menghapus data penguji yang anda pilih!",
        });
    } catch (error) {
        return res.status(500).json({
            response: false,
            message: "Waduh, terjadi kesalahan pada server kami!",
        });
    }
}

module.exports = {
    getPenguji,
    createPenguji,
    updatePenguji,
    deletePenguji
}