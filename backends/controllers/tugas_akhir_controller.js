const db = require("../config/db");

const getTugasAkhirInfoForMahasiswa = async (req, res) => {
    const { nim } = req.user;
    try {
        const data = await db.query(
            "SELECT * FROM view_list_detail_pendaftaran_ta WHERE nim = $1 ORDER BY TIMESTAMP DESC",
            [nim]
        );
        if (data.rowCount === 0) {
            return res.status(400).json({
                response: false,
                message: "Maaf, data tidak ditemukan!",
            });
        }
        res.status(200).json({
            response: true,
            results: data.rows
        });
    } catch (err) {
        res.status(500).json({ 
            response: false,
            message: err.message 
        });
    }
};

const getAllTugasAkhir = async (req, res) => {
    let { page, search } = req.query;
    page = parseInt(page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    try {
        // Query untuk mendapatkan data dengan pagination
        let query = `SELECT * FROM view_list_detail_pendaftaran_ta`;
        let queryParams = [limit, offset];
        
        // Jika ada pencarian, tambahkan klausa WHERE
        if (search) {
            query += ` WHERE LOWER(nama_mahasiswa) LIKE $3 OR LOWER(judul_ta) LIKE $3 OR LOWER(nim) LIKE $3`;
            queryParams.push(`%${search.toLowerCase()}%`);
        }

        query += ` ORDER BY TIMESTAMP LIMIT $1 OFFSET $2`;

        // Jalankan query
        const data = await db.query(query, queryParams);

        // Query untuk mendapatkan total count data (untuk pagination)
        let countQuery = `SELECT COUNT(*) FROM view_list_detail_pendaftaran_ta`;
        if (search) {
            countQuery += ` WHERE LOWER(nama_mahasiswa) LIKE $1 OR LOWER(judul_ta) LIKE $1 OR LOWER(nim) LIKE $1`;
        }

        const totalCountResult = await db.query(countQuery, search ? [`%${search.toLowerCase()}%`] : []);
        const totalCount = parseInt(totalCountResult.rows[0].count, 10);

        // Hitung total halaman
        const totalPages = Math.ceil(totalCount / limit);

        // Buat link prev dan next
        const baseUrl = `${req.protocol}://${req.get('host')}${req.path}`;
        const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}${search ? `&search=${search}` : ''}` : null;
        const nextPage = page < totalPages ? `${baseUrl}?page=${page + 1}${search ? `&search=${search}` : ''}` : null;

        if (data.rowCount == 0) {
            return res.status(400).json({
                response: false,
                message: "Oops! Data tidak ditemukan, mungkin belum ada mahasiswa yang mendaftarkan tugas akhir sebelumnya!",
            })
        }
        // Return hasil dalam JSON
        res.status(200).json({
            response: true,
            message: "Berikut data list tugas akhir mahasiswa yang telah didaftarkan sebelumnya!",
            info: {
                total_all_data: totalCount,
                total_page: totalPages,
                data_per_page: limit,
                total_data_in_this_page: data.rowCount,
                current_page: page,
                next_page: nextPage,
                prev_page: prevPage
            },
            results: data.rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            response: false,
            message: "Waduh, terjadi kesalahan pada server kami!",
        });
    }
};

const createTugasAkhir = async (req, res) => {
    const {
        judul_ta,
        jenis_pendaftaran,
        kategori_ta,
        berkas,
        nim,
        nidn_pembimbing1,
        nidn_pembimbing2
    } = req.body;

    try {

        // mahasiswa hanya boleh mendaftar ta kembali jika status sebelumnya sudah ditolak
        const checkTAStatusReg = await db.query(
            `SELECT status FROM tugas_akhir WHERE nim = $1 AND status IN ('MENUNGGU', 'SETUJU')`,
            [nim]
        );
        if (checkTAStatusReg.rowCount > 0) {
            return res.status(400).json({
                response: false,
                message: "Maaf proses pendaftaran TA gagal, tugas akhir anda sebelumnya mungkin telah disetujui atau masih dalam proses verifikasi oleh Koordinator TA, silahkan tunggu proses verifikasi selesai untuk melanjutkan aksi lainnya!",
            });
        }

        if (nidn_pembimbing1 === nidn_pembimbing2) {
            return res.status(400).json({
                response: false,
                message: "Maaf, pembimbing 1 dan 2 tidak boleh sama!",
            });
        }

        const checkPembimbing1 = await db.query(
            `SELECT * FROM view_detail_dosen_pembimbing WHERE nidn = $1 AND kuota_tersisa > 0`,
            [nidn_pembimbing1]
        );
        if (checkPembimbing1.rowCount === 0) {
            return res.status(400).json({
                response: false,
                message: "Maaf, pembimbing 1 tidak dapat digunakan, sepertinya kuota telah habis atau pembimbing belum terdaftar!",
            })
        }

        if (nidn_pembimbing2) {            
            const checkPembimbing2 = await db.query(
                `SELECT * FROM view_detail_dosen_pembimbing WHERE nidn = $1 AND kuota_tersisa > 0`,
                [nidn_pembimbing2]
            );
            if (checkPembimbing2.rowCount === 0) {
                return res.status(400).json({
                    response: false,
                    message: "Maaf, pembimbing 2 tidak dapat digunakan, sepertinya kuota telah habis atau pembimbing belum terdaftar!",
                })
            }
        }

        const results = await db.query(
            `CALL mahasiswa_mendaftar_ta( $1, $2, $3, $4, $5, $6, $7 )`,
            [judul_ta, jenis_pendaftaran, kategori_ta, berkas, nim, nidn_pembimbing1, nidn_pembimbing2]
        );
        if (results.rowCount === 0) {
            return res.status(400).json({
                response: false,
                message: "Maaf, proses pendaftaran TA gagal!",
            })
        }
        return res.status(200).json({
            response: true,
            message: "Yeay, proses pendaftaran TA sukses!",
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response: false,
            message: "Waduh, ada kesalahan di server kami!",
        })
    }
}

const updateTugasAkhir = async (req, res) => {
    const { no_reg_ta } = req.params;
    const { 
        status,
        catatan,
        nidn_penguji1,
        nidn_penguji2
    } = req.body;

    try {

        if (nidn_penguji1 === nidn_penguji2 && nidn_penguji1 !== null && nidn_penguji2 !== null) {
            return res.status(400).json({
                response: false,
                message: "Maaf, penguji 1 dan 2 tidak boleh sama!",
            });
        }

        // penguji tidak boleh sama dengan pembimbing yang telah dipilih oleh mahasiswa
        const validasiPengujiNotMatchWithPembimbing = await db.query("SELECT * FROM tugas_akhir WHERE no_reg_ta = $1 AND (nidn_pembimbing1 IN ($2, $3) OR nidn_pembimbing2 IN ($2, $3))", [no_reg_ta, nidn_penguji1, nidn_penguji2]);
        if (validasiPengujiNotMatchWithPembimbing.rowCount > 0) {
            return res.status(400).json({
                response: false,
                message: "Maaf, penguji yang anda pilih tidak boleh sama dengan pembimbing TA!",
            })
        }

        const checkPenguji1 = await db.query(
            `SELECT * FROM view_detail_dosen_penguji WHERE nidn = $1 AND kuota_tersisa > 0`,
            [nidn_penguji1]
        );
        if (checkPenguji1.rowCount === 0 && nidn_penguji1 !== null) {
            return res.status(400).json({
                response: false,
                message: "Maaf, penguji 1 tidak dapat digunakan, sepertinya kuota telah habis atau penguji belum terdaftar!",
            })
        }

        if (nidn_penguji2) {            
            const checkPenguji2 = await db.query(
                `SELECT * FROM view_detail_dosen_penguji WHERE nidn = $1 AND kuota_tersisa > 0`,
                [nidn_penguji2]
            );
            if (checkPenguji2.rowCount === 0 && nidn_penguji2 !== null) {
                return res.status(400).json({
                    response: false,
                    message: "Maaf, penguji 2 tidak dapat digunakan, sepertinya kuota telah habis atau penguji belum terdaftar!",
                })
            }
        }

        const results = await db.query('CALL koordinator_verifikasi_ta( $1, $2, $3, $4, $5 )', 
            [no_reg_ta, status, catatan, nidn_penguji1, nidn_penguji2]);
        if (results.rowCount === 0) {
            return res.status(400).json({
                response: false,
                message: "Maaf, proses update gagal!",
            })
        }        
        return res.status(200).json({
            response: true,
            message: "Yeay, proses update sukses!",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response: false,
            message: "Waduh, ada kesalahan di server kami!",
        })
    }
}

module.exports = {
    getTugasAkhirInfoForMahasiswa,
    getAllTugasAkhir,
    createTugasAkhir,
    updateTugasAkhir
};