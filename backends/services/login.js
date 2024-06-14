// importing login used library
const argon2 = require("argon2");
const db = require("../config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifikasi_login = async (req, res) => {
	// fetch email and password from request body
	const { email, password } = req.body;
	const results = await db.query(
		`SELECT * FROM view_detail_akun WHERE email = $1`,
		[email]
	);
	if (results.rows.length === 0) {
		return res.status(400).json({
			response: false,
			message: "Maaf, Email/Password yang anda masukkan salah!",
		});
	}

	// fetch stored hash password in db
	const hashPassword = results.rows[0].password;

	// verify password
	try {
		if (await argon2.verify(hashPassword, password)) {
			//creating a access token
			const accessToken = jwt.sign(
				{				
                    email: results.rows[0].email,
                    nim: results.rows[0].nim,
					nama: results.rows[0].nama,
					role: results.rows[0].role,
				},
				process.env.ACCESS_TOKEN_SECRET,
				{
					expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
				}
			);

			// Creating refresh token not that expiry of refresh
			// token is greater than the access token

			const refreshToken = jwt.sign(
				{
                    email: results.rows[0].email,
				},
				process.env.REFRESH_TOKEN_SECRET,
				{ 
                    expiresIn: process.env.REFRESH_TOKEN_LIFETIME_IN_SERVER,
                }
			);

			// Assigning refresh token in http-only cookie
			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				sameSite: "Strict",
				secure: process.env.ENV_STAGE === 'prod', // true in production (https only stored in production)
				maxAge: Number(process.env.REFRESH_TOKEN_LIFETIME_IN_CLIENT),
			});

			return res.status(200).json({
				response: true,
				accessToken: accessToken,
				message:
					"Yeay, login sukses! sebentar ya, kami akan mengarahkan kamu kehalaman dashboard.",
			});
		} else {
			return res.status(400).json({
				response: false,
				message: "Maaf, Email/Password yang anda masukkan salah!",
			});
		}
	} catch (err) {
		return res.status(500).json({
			response: false,
			message: err.message,
		});
	}
};

module.exports = {
	verifikasi_login,
};
