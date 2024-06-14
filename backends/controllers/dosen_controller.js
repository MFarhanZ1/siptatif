const db = require("../config/db");

const getAllDosen = async (req, res) => {
    // parsing query data from url
    const { page } = req.query;

    // parsing page number to integer and check if it's a number or not
    const numeric_page = page ? parseInt(page) : 1
    if (isNaN(numeric_page)) {
        return res.status(400).json({
            response: false,
            message: "Maaf, page number harus berupa angka!"
        })
    }

    // pagination
    const limit = 20;
    const offset = (numeric_page - 1) * 10;

    // get all dosen from database with pagination logic
    const results = await db.query("SELECT * FROM dosen LIMIT $1 OFFSET $2", [limit, offset]);

    // get total data of dosen and calculate total possible pages
    const total_rows = results.rows.length;
    const total_page = Math.ceil(total_rows / limit);

    // creating url for next and prev node
    const url = `${req.protocol}://${req.get('host')}`;
    const next_page = numeric_page + 1 > total_page ? null : url + `/dosen?page=${numeric_page + 1}`
    const prev_page = numeric_page <= 1 ? null : url + `/dosen?page=${numeric_page - 1}`

    // if query page is greater than total page, return error
    if (numeric_page > total_page) {
        return res.status(400).json({
            response: false,
            message: `Mau nyari apa deck hadeh, jauh bgt page nya cok, data dosen gak sampe page-${numeric_page} bang!`
        })
    }

    // if query page is less than 1, return error not found
    if (total_rows === 0) {
        return res.status(400).json({
            response: false,
            message: "Maaf, data dosen tidak ditemukan!"
        })
    }

    // return true response if all test is passed
    return res.status(200).json({
        response: true,
        message: "Berikut data dosen yang telah didaftarkan sebelumnya!",
        info: {
            total_data: total_rows,
            total_page: total_page,
            data_per_page: limit,
            current_page: page,
            next_page: next_page,
            prev_page: prev_page
        },
        results: results.rows
    })
}

const getDosenByNIDN = async (req, res) => {
    const { nidn } = req.params;
    const results = await db.query("SELECT * FROM dosen WHERE nidn = $1", [nidn]);
    if (results.rows.length === 0) {
        return res.status(400).json({
            response: false,
            message: "Maaf, data dosen tidak ditemukan!"
        })
    }
    return res.status(200).json({
        response: true,
        message: "Berhasil menemukan data dosen yang anda cari!",
        results: results.rows[0]
    })
}

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
        })
    } catch (error) {
        return res.status(400).json({
            response: false,
            message: error.message
        })
    }
}

const updateDosen = async (req, res) => {
    const { nidn, nama, no_hp, jenis_kelamin, email } = req.body;

    try {
        const results = await db.query(
            "UPDATE dosen set nama=$1, no_hp=$2, jenis_kelamin=$3, email=$4 WHERE nidn=$5", 
            [nama, no_hp, jenis_kelamin, email, nidn]
        );
        return res.status(200).json({
            response: true,
            message: "Berhasil memperbarui data dosen terbaru!",
        })
    } catch (error) {
        return res.status(400).json({
            response: false,
            message: error.message
        })
    }
}

const deleteDosen = async (req, res) => {
    const { nidn } = req.params;

    try {
        const results = await db.query(
            "DELETE FROM dosen WHERE nidn = $1", 
            [nidn]
        );
        if (results.rowCount === 0) {
            return res.status(400).json({
                response: false,
                message: "Maaf, proses delete gagal, data dosen yang anda pilih tidak ditemukan!"
            })
        }
        return res.status(200).json({
            response: true,
            message: "Berhasil menghapus data dosen yang anda pilih!",
        })
    } catch (error) {
        return res.status(400).json({
            response: false,
            message: error.message
        })
    }
}

module.exports = {
    getAllDosen,
    getDosenByNIDN,
    createDosen,
    updateDosen,
    deleteDosen
}