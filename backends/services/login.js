// importing login used library
const argon2 = require("argon2");
const db = require("../config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifikasi_login = async (req, res) => {
	// fetch email and password from request body
	const { email, password } = req.body;

	try {
		// mengambil data akun general berdasarkan email untuk mengambil data akun untuk validasi password
		let results;
		results = await db.query(
			`SELECT * FROM view_detail_akun WHERE email = $1`,
			[email]
		)

		// jika data akun tidak ditemukan, akan dimunculkan pesan eror tidak valid
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
			// kalau password cocok dengan yang didatabase, baru akan dibuatkan 2 jwt token
			if (await argon2.verify(hashPassword, password)) {
				//creating a access token depending on roles
				let accessToken;

				// generate access token if role admin prodi
				if (results.rows[0].role === "Admin Prodi") {
					accessToken = jwt.sign(
						{
							email: results.rows[0].email,
							role: results.rows[0].role,
						},
						process.env.ACCESS_TOKEN_SECRET,
						{
							expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
						}
					);
				} 
				
				// generate access token if role koordinat TA
				else if (results.rows[0].role === "Koordinator TA") {					
					results = await db.query(
						`SELECT * FROM view_detail_akun_dosen WHERE email = $1`,
						[email]
					);
					accessToken = jwt.sign(
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
				} 
				
				// generate access token if role mahasiswa
				else if (results.rows[0].role === "Mahasiswa") {					
					results = await db.query(
						`SELECT * FROM view_detail_akun_mahasiswa WHERE email = $1`,
						[email]
					);
					accessToken = jwt.sign(
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
				}

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
					secure: process.env.ENV_STAGE === "prod", // true in production (https only stored in production)
					maxAge: Number(process.env.REFRESH_TOKEN_LIFETIME_IN_CLIENT),
				});

				return res.status(200).json({
					response: true,
					access_token: accessToken,
					message:
						"Yeay, login sukses! sebentar ya, kami akan mengarahkan kamu kehalaman dashboard.",
				});
			} 
			
			// jika password tidak cocok akan ada pesan eror
			else {
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
	} catch (err) {
		return res.status(500).json({
			response: false,
			message: "Waduh, terjadi kesalahan di server kami!",
		});
	}
};

const verifikasi_login_mobile = async (req, res) => {
	// fetch email and password from request body
	const { email, password } = req.body;

	try {
		// mengambil data akun general berdasarkan email untuk mengambil data akun untuk validasi password
		let results;
		results = await db.query(
			`SELECT * FROM view_detail_akun WHERE email = $1`,
			[email]
		)

		// jika data akun tidak ditemukan, akan dimunculkan pesan eror tidak valid
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
			// kalau password cocok dengan yang didatabase, baru akan dibuatkan 2 jwt token
			if (await argon2.verify(hashPassword, password)) {
				//creating a access token depending on roles
				let accessToken;

				// generate access token if role admin prodi
				if (results.rows[0].role === "Admin Prodi") {
					accessToken = jwt.sign(
						{
							email: results.rows[0].email,
							role: results.rows[0].role,
						},
						process.env.ACCESS_TOKEN_SECRET,
						{
							expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
						}
					);
				} 
				
				// generate access token if role koordinat TA
				else if (results.rows[0].role === "Koordinator TA") {					
					results = await db.query(
						`SELECT * FROM view_detail_akun_dosen WHERE email = $1`,
						[email]
					);
					accessToken = jwt.sign(
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
				} 
				
				// generate access token if role mahasiswa
				else if (results.rows[0].role === "Mahasiswa") {					
					results = await db.query(
						`SELECT * FROM view_detail_akun_mahasiswa WHERE email = $1`,
						[email]
					);
					accessToken = jwt.sign(
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
				}

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

				return res.status(200).json({
					response: true,
					access_token: accessToken,
					refresh_token: refreshToken,
					role: results.rows[0].role,
					message:
						"Yeay, login sukses! sebentar ya, kami akan mengarahkan kamu kehalaman dashboard.",
				});
			} 
			
			// jika password tidak cocok akan ada pesan eror
			else {
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
	} catch (err) {
		return res.status(500).json({
			response: false,
			message: "Waduh, terjadi kesalahan di server kami!",
		});
	}
};

module.exports = {
	verifikasi_login,
	verifikasi_login_mobile,
};
