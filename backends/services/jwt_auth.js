const jwt = require("jsonwebtoken");
const db = require("../config/db");

require("dotenv").config();

const refresh_access_token = (req, res) => {
	const refreshToken = req.cookies?.refreshToken;
	if (!refreshToken)
		return res.status(401).json({
			response: false,
			message: "Maaf, sesi anda sudah habis, silahkan login kembali!",
		});

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		async (err, user) => {
			// jika refresh token tidak valid, akan di bully yang ngehit endpoint ini
			if (err)
				return res.status(403).json({
					response: false,
					message:
						err.name === "TokenExpiredError"
							? "Sesi anda sudah habis, silahkan generate akses token baru dengan refresh token anda kembali!"
							: "Hayo deck, mau ngapain kmuh aowkaowk! heker yh banh? 😜😜",
				});

			try {
				// mengambil data akun general berdasarkan email untuk mengambil data akun untuk pembuatan access token baru
                let results;
                results = await db.query(
                    `SELECT * FROM view_detail_akun WHERE email = $1`,
                    [user.email]
                )

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
						[user.email]
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
						[user.email]
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


				return res.status(200).json({
					response: true,
					access_token: accessToken,
					message:
						"Yeay, verifikasi token sukses! akses token anda berhasil kembali dibuat coy.",
				});
			} catch (error) {
                console.log(error);
                return res.status(500).json({
                    response: false,
                    message: "Waduh, sepertinya server kami mengalami kesalahan!",
                })
            }
		}
	);
};

module.exports = {
	refresh_access_token,
};
