const db = require("../config/db");

const getKeahlian = async (req, res) => {
    const { search } = req.query;
    try {
        let results;
        if (search){
            results = await db.query(
                "SELECT * FROM keahlian WHERE LOWER(nama) LIKE $1 ORDER BY nama",
                [`%${search.toLowerCase()}%`]
            );
        } else {
            results = await db.query(
                "SELECT * FROM keahlian ORDER BY nama",
            );
        }

        if (results.rows.length === 0) {
            return res.status(400).json({ 
                response: false,
                message: "Maaf, data tidak ditemukan!"
            });
        }

        res.status(200).json({ 
            response: true,
            results: results.rows
        });

    } catch (err) {
        res.status(500).json({ 
            response: false,
            message: err.message 
        });
    }

}
const getKeahlianDosen = async (req, res) => {
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
		if (search) {
			regexSearch = `%${search.toLowerCase()}%`;
			results = await db.query(
				'SELECT * FROM view_keahlian_dosen WHERE LOWER(nama) LIKE $1 OR LOWER(nidn) LIKE $1 OR LOWER(keahlian) LIKE $1 ORDER BY nama LIMIT $2 OFFSET $3',
				[regexSearch, limit, offset]
			);
			countData = await db.query(
				"SELECT COUNT(*) FROM view_keahlian_dosen WHERE LOWER(nama) LIKE $1 OR LOWER(nidn) LIKE $1 OR LOWER(keahlian) LIKE $1",
				[regexSearch]
			);
		} else {
			results = await db.query("SELECT * FROM view_keahlian_dosen ORDER BY nama LIMIT $1 OFFSET $2", [
				limit,
				offset,
			]);
			countData = await db.query("SELECT COUNT(*) FROM view_keahlian_dosen");
		}

		// get total data of dosen and calculate total possible pages
		const total_rows = countData.rows[0].count;
		const total_page = Math.ceil(total_rows / limit);

		// creating url for next and prev node
		const url = `${req.protocol}://${req.get("host")}`;
		const endpoint = "keahlian-dosen";
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
			message: "Berikut data dosen serta keahliannya yang telah didaftarkan sebelumnya!",
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
}

const createKeahlianDosen = async (req, res) => {
    const { nidn, id_keahlian } = req.body;
    try {
        await db.query(
            "INSERT INTO keahlian_dosen (nidn, id_keahlian) VALUES ($1, $2)",
            [nidn, id_keahlian]
        );
        return res.status(200).json({ 
            response: true,
            message: "Data keahlian dosen berhasil ditambahkan!"
        });
    } catch (err) {
        return res.status(500).json({ 
            response: false,
            message: err.message
        });
    }
}

const deleteKeahlianDosen = async (req, res) => {
    const { nidn, id_keahlian } = req.body;
    try {
        const results = await db.query(
            "DELETE FROM keahlian_dosen WHERE nidn = $1 AND id_keahlian = $2",
            [nidn, parseInt(id_keahlian)]
        );
        if (results.rowCount === 0) {
            return res.status(400).json({ 
                response: false,
                message: "Maaf, data keahlian dosen tidak ditemukan, jadi gada yang bisa dihapus!"
            });
        }
        return res.status(200).json({ 
            response: true,
            message: "Data keahlian dosen berhasil dihapuskan!"
        });
    } catch (err) {
        return res.status(500).json({ 
            response: false,
            message: err.message
        });
    }
}

module.exports = {
    getKeahlian,
    getKeahlianDosen,
    createKeahlianDosen,
    deleteKeahlianDosen
}