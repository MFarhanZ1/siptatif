// importing hash algorithm
const argon2 = require("argon2");
const db = require("../config/db");

const verifikasi_login = async (req, res) => {

    // fetch email and password from request body
    const { email, password } = req.body;
    const results = await db.query(`SELECT akun.email "email", akun.password "password", role.nama "role" FROM akun, role WHERE email = $1 AND role.id = akun.id_role`, [email]);
    if (results.rows.length === 0) {
        return res.status(400).json({
            response: false,
            message: "Maaf, Email tersebut tidak terdaftar di sistem kami!",
        });
    }

    // fetch stored hash password in db
    const hashPassword = results.rows[0].password;

    // verify password
    try {
        if (await argon2.verify(hashPassword, password)) {
            return res.status(200).json({
                response: true,
                message: "Yeay, login sukses!",
                results: {
                    "email": results.rows[0].email,
                    "role": results.rows[0].role
                },
            });
        } else {
            return res.status(400).json({
                response: false,
                message: "Maaf, Password yang anda masukkan salah!",
            });
        }
    } catch (err) {
        return res.status(500).json({
            response: false,
            message: err.message,
        });
    }
}

module.exports = {
    verifikasi_login
}