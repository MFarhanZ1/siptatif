const db = require("../config/db");

const getPembimbing = async (req, res) => {
    // parsing query data from url
	const { page, search } = req.query;
    try {
        // parsing page number to integer and check if it's a number or not
		const numeric_page = page ? parseInt(page) : 1;
		if (isNaN(numeric_page)) {
			return res.status(400).json({
				response: false,
				message: "Maaf, page number harus berupa angka!",
			});
		}

		// pagination
		const limit = 20;
		const offset = (numeric_page - 1) * limit;

        // get all dosen from database with pagination logic, if search query is not empty, then add where search logic
		let results;
		let countData;

                // bakal query execute mode searching
		if (search) {
			regexSearch = `%${search.toLowerCase()}%`; 
            
			results = await db.query(
				"SELECT * FROM view_detail_dosen_pembimbing WHERE (LOWER(nama) LIKE $1 OR LOWER(nidn) LIKE $1 OR LOWER(keahlian) LIKE $1) LIMIT $2 OFFSET $3",
				[regexSearch, limit, offset]
			);
			countData = await db.query(
				"SELECT COUNT(*) FROM view_detail_dosen_pembimbing WHERE (LOWER(nama) LIKE $1 OR LOWER(nidn) LIKE $1 OR LOWER(keahlian) LIKE $1)",
				[regexSearch]
			);
		}

		// bakal query execute mode paging
		else if (page) {
			results = await db.query(
				"SELECT * FROM view_detail_dosen_pembimbing LIMIT $1 OFFSET $2",
				[limit, offset]
			);
			countData = await db.query("SELECT COUNT(*) FROM view_detail_dosen_pembimbing");
		}

		// bakal query execute mode normal, langsung terobos semua data jika tak ada query search/page
		else {
            results = await db.query("SELECT * FROM view_detail_dosen_pembimbing WHERE kuota_tersisa > 0");
            if (results.rows.length === 0) {
                return res.status(400).json({
                    response: false,
                    message: "Maaf, data pembimbing tidak ditemukan!",
                });
            }
            return res.status(200).json({
                response: true,
                message: "Berhasil memuat data pembimbing!",
                results: results.rows,
            });
		}

        // get total data of dosen and calculate total possible pages
		const total_rows = countData.rows[0].count;
		const total_page = Math.ceil(total_rows / limit);

		// creating url for next and prev node
		const url = `${req.protocol}://${req.get("host")}`;
		const endpoint = "pembimbing";
		const next_page =
			numeric_page + 1 > total_page
				? null
				: url + `/${endpoint}?page=${numeric_page + 1}`;
		const prev_page =
			numeric_page <= 1 ? null : url + `/${endpoint}?page=${numeric_page - 1}`;

		// if query page is less than 1, return error not found
		if (total_rows === 0 || results.rows.length === 0) {
			return res.status(400).json({
				response: false,
				message: "Maaf, data dosen pembimbing tidak ditemukan!",
			});
		}

        // return true response if all test is passed
		return res.status(200).json({
			response: true,
			message: "Berikut data dosen pembimbing yang telah didaftarkan sebelumnya!",
			info: {
				total_all_data: total_rows,
				total_page: total_page,
				data_per_page: limit,
				total_data_in_this_page: results.rows.length,
				current_page: page,
				next_page: next_page,
				prev_page: prev_page,
			},
			results: results.rows,
		});

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response: false,
            message: "Waduh, terjadi kesalahan pada server kami!",
        });
    }
};

const createPembimbing = async (req, res) => {
    const { nidn, kuota } = req.body;
    if (!nidn) {
        return res.status(400).json({
            response: false,
            message: "Maaf, proses insert gagal, lengkapi data anda terlebih dahulu mas/mbak!",
        });
    }
    try {
        const results = await db.query("INSERT INTO dosen_pembimbing (nidn, kuota) VALUES ($1, $2)", [nidn, kuota]);
        if (results.rowCount === 0) {
            return res.status(400).json({
                response: false,
                message: "Maaf, proses insert gagal!",
            });
        }
        return res.status(200).json({
            response: true,
            message: "Berhasil menambahkan data pembimbing baru!",
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
                message: "Maaf, proses insert gagal, data pembimbing yang anda pilih sudah terdaftar, kini anda cuman bisa menghapus dan memperbarui kuotanya saja!",
            });
        }
        return res.status(500).json({
            response: false,
            message: "Waduh, terjadi kesalahan pada server kami!",
        });
    }
}

const updatePembimbing = async (req, res) => {
    const { nidn } = req.params;
    const { kuota } = req.body;
    if (!kuota && kuota != 0) {
        return res.status(400).json({
            response: false,
            message: "Maaf, proses update gagal, lengkapi data anda terlebih dahulu mas/mbak!",
        });
    }
    try {
        const results = await db.query("UPDATE dosen_pembimbing SET kuota = $1 WHERE nidn = $2", [kuota, nidn]);
        if (results.rowCount === 0) {
            return res.status(400).json({
                response: false,
                message: "Maaf, proses update gagal, data pembimbing yang anda pilih tidak ditemukan!",
            });
        }
        return res.status(200).json({
            response: true,
            message: "Berhasil memperbarui data pembimbing terbaru!",
        });
    } catch (error) {
        return res.status(500).json({
            response: false,
            message: "Waduh, terjadi kesalahan pada server kami!",
        });
    }
}

const deletePembimbing = async (req, res) => {
    const { nidn } = req.params;
    try {
        const results = await db.query("DELETE FROM dosen_pembimbing WHERE nidn = $1", [nidn]);
        if (results.rowCount === 0) {
            return res.status(400).json({
                response: false,
                message: "Maaf, proses delete gagal, data pembimbing yang anda pilih tidak ditemukan!",
            });
        }
        return res.status(200).json({
            response: true,
            message: "Berhasil menghapus data pembimbing yang anda pilih!",
        });
    } catch (error) {
        return res.status(500).json({
            response: false,
            message: "Waduh, terjadi kesalahan pada server kami!",
        });
    }
}

module.exports = {
    getPembimbing,
    createPembimbing,
    updatePembimbing,
    deletePembimbing
}