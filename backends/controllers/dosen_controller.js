const db = require("../config/db");

const getDosen = async (req, res) => {
	// parsing query data from url
	const { page, search } = req.query;

	// query to database and handle if error occurs
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
				"SELECT * FROM dosen WHERE LOWER(nama) LIKE $1 OR LOWER(nidn) LIKE $1 ORDER BY CASE WHEN nama LIKE 'Prof. Dr.%' THEN 1 WHEN nama LIKE 'Dr.%' THEN 2 ELSE 3 END, nama LIMIT $2 OFFSET $3",
				[regexSearch, limit, offset]
			);
			countData = await db.query(
				"SELECT COUNT(*) FROM dosen WHERE LOWER(nama) LIKE $1 OR LOWER(nidn) LIKE $1",
				[regexSearch]
			);
		}

		// bakal query execute mode paging
		else if (page) {
			results = await db.query(
				"SELECT * FROM dosen ORDER BY CASE WHEN nama LIKE 'Prof. Dr.%' THEN 1 WHEN nama LIKE 'Dr.%' THEN 2 ELSE 3 END, nama LIMIT $1 OFFSET $2",
				[limit, offset]
			);
			countData = await db.query("SELECT COUNT(*) FROM dosen");
		}

		// bakal query execute mode normal, langsung terobos semua data jika tak ada query search/page
		else {
			results = await db.query(
				"SELECT * FROM dosen ORDER BY CASE WHEN nama LIKE 'Prof. Dr.%' THEN 1 WHEN nama LIKE 'Dr.%' THEN 2 ELSE 3 END, nama"
			);
			if (results.rows.length === 0) {
                return res.status(400).json({
                    response: false,
                    message: "Maaf, data dosen tidak ditemukan!",
                });
            }
			return res.status(200).json({
				response: true,
				message: "Berikut data dosen yang telah didaftarkan sebelumnya!",
				results: results.rows,
			});
		}

		// get total data of dosen and calculate total possible pages
		const total_rows = countData.rows[0].count;
		const total_page = Math.ceil(total_rows / limit);

		// creating url for next and prev node
		const url = `${req.protocol}://${req.get("host")}`;
		const endpoint = "dosen";
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
				message: "Maaf, data dosen tidak ditemukan!",
			});
		}

		// return true response if all test is passed
		return res.status(200).json({
			response: true,
			message: "Berikut data dosen yang telah didaftarkan sebelumnya!",
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
		return res.status(500).json({
			response: false,
			message: "Waduh, terjadi kesalahan pada server kami!",
		});
	}
};

const createDosen = async (req, res) => {
	const { nidn, nama, no_hp, jenis_kelamin, email } = req.body;

	try {
		await db.query(
			"INSERT INTO dosen (nidn, nama, no_hp, jenis_kelamin, email) VALUES ($1, $2, $3, $4, $5)",
			[nidn, nama, no_hp, jenis_kelamin, email]
		);
		return res.status(200).json({
			response: true,
			message: "Berhasil menambahkan data dosen baru!",
		});
	} catch (error) {
		return res.status(400).json({
			response: false,
			message: error.message,
		});
	}
};

const updateDosen = async (req, res) => {
	const { nidn } = req.params;
	const { nama, no_hp, jenis_kelamin, email } = req.body;

	try {
		const results = await db.query(
			"UPDATE dosen set nama=$1, no_hp=$2, jenis_kelamin=$3, email=$4 WHERE nidn=$5",
			[nama, no_hp, jenis_kelamin, email, nidn]
		);
		if (results.rowCount === 0) {
			return res.status(400).json({
				response: false,
				message:
					"Maaf, proses update gagal, data dosen yang anda pilih tidak ditemukan!",
			});
		}
		return res.status(200).json({
			response: true,
			message: "Berhasil memperbarui data dosen terbaru!",
		});
	} catch (error) {
		return res.status(500).json({
			response: false,
			message: "Waduh, terjadi kesalahan pada server kami!",
		});
	}
};

const deleteDosen = async (req, res) => {
	const { nidn } = req.params;

	try {
		// delete juga akun koordinator ta di table akun jika ada
		const getEmail = await db.query("SELECT email FROM dosen WHERE nidn = $1", [
			nidn,
		]);
		if (getEmail.rows[0])
			await db.query("DELETE FROM akun WHERE email = $1", [
				getEmail.rows[0].email,
			]);

		// baru delete data dosen di tabel dosennya
		const results = await db.query("DELETE FROM dosen WHERE nidn = $1", [nidn]);

		if (results.rowCount === 0) {
			return res.status(400).json({
				response: false,
				message:
					"Maaf, proses delete gagal, data dosen yang anda pilih tidak ditemukan!",
			});
		}
		return res.status(200).json({
			response: true,
			message: "Berhasil menghapus data dosen yang anda pilih!",
		});
	} catch (error) {
		return res.status(500).json({
			response: false,
			message: "Waduh, terjadi kesalahan pada server kami!",
		});
	}
};

module.exports = {
	getDosen,
	createDosen,
	updateDosen,
	deleteDosen,
};
