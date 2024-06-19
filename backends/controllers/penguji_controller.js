const db = require("../config/db");

const getPenguji = async (req, res) => {
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
				"SELECT vd.nidn, vd.nama, vd.keahlian, dp.kuota FROM view_detail_dosen vd, dosen_penguji dp WHERE (LOWER(vd.nama) LIKE $1 OR LOWER(vd.nidn) LIKE $1 OR LOWER(vd.keahlian) LIKE $1) AND dp.nidn = vd.nidn LIMIT $2 OFFSET $3",
				[regexSearch, limit, offset]
			);
			countData = await db.query(
				"SELECT COUNT(*) FROM view_detail_dosen vd, dosen_penguji dp WHERE (LOWER(vd.nama) LIKE $1 OR LOWER(vd.nidn) LIKE $1 OR LOWER(vd.keahlian) LIKE $1) AND dp.nidn = vd.nidn",
				[regexSearch]
			);
		}

		// bakal query execute mode paging
		else if (page) {
			results = await db.query(
				"SELECT vd.nidn, vd.nama, vd.keahlian, dp.kuota FROM view_detail_dosen vd, dosen_penguji dp WHERE dp.nidn = vd.nidn LIMIT $1 OFFSET $2",
				[limit, offset]
			);
			countData = await db.query("SELECT COUNT(*) FROM view_detail_dosen vd, dosen_penguji dp WHERE dp.nidn = vd.nidn");
		}

		// bakal query execute mode normal, langsung terobos semua data jika tak ada query search/page
		else {
            results = await db.query("SELECT vd.nidn, vd.nama, vd.keahlian, dp.kuota from view_detail_dosen vd, dosen_penguji dp where dp.nidn = vd.nidn and dp.kuota > 0");
            if (results.rows.length === 0) {
                return res.status(400).json({
                    response: false,
                    message: "Maaf, data penguji tidak ditemukan!",
                });
            }
            return res.status(200).json({
                response: true,
                message: "Berhasil memuat data penguji!",
                results: results.rows,
            });
		}

        // get total data of dosen and calculate total possible pages
		const total_rows = countData.rows[0].count;
		const total_page = Math.ceil(total_rows / limit);

		// creating url for next and prev node
		const url = `${req.protocol}://${req.get("host")}`;
		const endpoint = "penguji";
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
				message: "Maaf, data dosen penguji tidak ditemukan!",
			});
		}

        // return true response if all test is passed
		return res.status(200).json({
			response: true,
			message: "Berikut data dosen penguji yang telah didaftarkan sebelumnya!",
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