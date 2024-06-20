const db = require("../config/db")

const getAllPengumuman = async (req, res) => {
    try {
        const results = await db.query("SELECT isi FROM pengumuman WHERE berlaku_mulai <= NOW() AND (berlaku_hingga >= NOW() OR berlaku_hingga IS NULL)");
        if (results.rows.length === 0) {
            return res.status(400).json({
                response: false,
                message: "Maaf, data tidak ditemukan!",
            });
        }
        return res.status(200).json({
            response: true,
            results: results.rows
        });
    } catch (error) {
        return res.status(500).json({
            response: false,
            message: "Waduh, terjadi kesalahan pada server kami!",
        });
    }
}

const getPengumumanRoleBased = async (req, res) => {
    const { role } = req.user;
    try {
        // Jika rolenya admin prodi, langsung keluar semua pengumuman yang pernah dibuat siapapun
        // jika rolenya bukan admin prodi, hanya mengambil pengumuman yang dibuat oleh role tersebut
        const results = await db.query(`SELECT * FROM pengumuman WHERE (created_by = $1 OR ${role === "Admin Prodi"}) ORDER BY berlaku_mulai`, [role]);
        if (results.rows.length === 0) {
            return res.status(400).json({
                response: false,
                message: "Maaf, data tidak ditemukan!",
            });
        }
        console.log(results.rows);

        res.status(200).json({
            response: true,
            message: `Berhasil mengambil data pengumuman yang di-input oleh ${role}!`,
            results: results.rows
        });
    } catch (error) {
        res.status(500).json({
            response: false,
            message: "Waduh, terjadi kesalahan pada server kami!",
        });
    }
}

const createPengumuman = async (req, res) => {
    const { isi, berlaku_mulai, berlaku_hingga } = req.body;
    const { role } = req.user;

    try {
        const results = await db.query("INSERT INTO pengumuman (isi, berlaku_mulai, berlaku_hingga, created_by) VALUES ($1, $2, $3, $4)", [isi, berlaku_mulai, berlaku_hingga, role]);
        if (results.rowCount === 0) {
            return res.status(400).json({
                response: false,
                message: "Maaf, proses insert gagal!",
            });
        }
        return res.status(200).json({
            response: true,
            message: "Berhasil menambahkan data pengumuman baru!",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response: false,
            message: "Waduh, terjadi kesalahan pada server kami!",
        });
    }
}

const updatePengumuman = async (req, res) => {

    const { id } = req.params;
    const { isi, berlaku_mulai, berlaku_hingga } = req.body;
    const { role } = req.user;

    try {
        const results = await db.query(`UPDATE pengumuman SET isi = $1, berlaku_mulai = $2, berlaku_hingga = $3 WHERE (created_by = $4 OR ${role === "Admin Prodi"}) AND id = $5`, [isi, berlaku_mulai, berlaku_hingga, role, id]);
        if (results.rowCount === 0) {
            return res.status(400).json({
                response: false,
                message: "Maaf, proses update gagal!",
            });
        }
        return res.status(200).json({
            response: true,
            message: "Berhasil memperbarui data pengumuman yang anda pilih!",
        });
    } catch (error) {
        return res.status(500).json({
            response: false,
            message: "Waduh, terjadi kesalahan pada server kami!",
        });
    }
}

const deletePengumuman = async (req, res) => {
    const { id } = req.params;
    const { role } = req.user;
    try {
        const results = await db.query(`DELETE FROM pengumuman WHERE id = $1 AND (created_by = $2 OR ${role === "Admin Prodi"})`, [id, role]);
        if (results.rowCount === 0) {
            return res.status(400).json({
                response: false,
                message: "Maaf, proses delete gagal!",
            });
        }
        return res.status(200).json({
            response: true,
            message: "Berhasil menghapus data pengumuman yang anda pilih!",
        });
    } catch (error) {
        return res.status(500).json({
            response: false,
            message: "Waduh, terjadi kesalahan pada server kami!",
        });
    }
}

module.exports = {
    getAllPengumuman,
    getPengumumanRoleBased,
    createPengumuman,
    updatePengumuman,
    deletePengumuman
}