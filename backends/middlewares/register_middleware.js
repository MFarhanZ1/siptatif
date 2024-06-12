const db = require("../config/db");

const only_email_students_usr = (req, res, next) => {
	const { email } = req.body;
	const emailRegexUSR = /^[a-zA-Z0-9._%+-]+@students\.uin-suska\.ac\.id$/;

	if (!emailRegexUSR.test(email)) {
		return res.status(400).json({
			response: false,
			message:
				"Maaf, hanya email khusus mahasiswa UIN Suska Riau yang dapat digunakan untuk mendaftar!",
		});
	}

	next();
};

const email_belum_terdaftar = async (req, res, next) => {
	// parsing email data from body
	const { email } = req.body;

	// mengecek apakah email tersebut sudah pernah terdaftar
	const resultInAkun = await db.query("SELECT * FROM akun WHERE email = $1", [
		email,
	]);
	if (resultInAkun.rows.length > 0) {
		return res.status(400).json({
			response: false,
			message:
				"Maaf, Email tersebut telah terdaftar di sistem kami sebelumnya!",
		});
	}

	next();
};

const link_verifikasi_email_sudah_di_tekan_dan_sesi_belum_habis = async (req, res, next) => {
	// parsing email data from body
	const { email } = req.body;

	// mengecek apakah email tersebut sudah terverifikasi atau belum
	const isVerified = await db.query(
		"SELECT is_verified FROM unverified_email_register WHERE email = $1",
		[email]
	);
	if (isVerified.rows.length === 0 || !isVerified.rows[0].is_verified) {
		return res.status(403).json({
			response: false,
			message: `Maaf, registrasi belum dapat dilakukan, sepertinya karna sesi anda telah habis. Jika tidak, mungkin email ${email} belum terverifikasi di sistem kami, silahkan tekan tombol verifikasi terlebih dahulu yang telah kami kirimkan ke email anda sebelumnya!`,
		});
	}

    next();
};

module.exports = {
	only_email_students_usr,
	email_belum_terdaftar,
    link_verifikasi_email_sudah_di_tekan_dan_sesi_belum_habis
};
