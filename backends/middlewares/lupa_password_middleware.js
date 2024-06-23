const db = require("../config/db");

const email_sudah_terdaftar = async (req, res, next) => {
	// parsing email data from body
	const { email } = req.body;

	try {
		// mengecek apakah email tersebut sudah pernah terdaftar dalam sistem atau belum
		const resultInAkun = await db.query("SELECT * FROM akun WHERE email = $1", [
			email,
		]);
		if (resultInAkun.rows.length == 0) {
			return res.status(400).json({
				response: false,
				message: `Maaf, Email ${email} tidak ditemukan di sistem kami!`,
			});
		}

		// used for handling role based send reset password in mobile apps
		req.user = resultInAkun.rows[0];
		return next();
	} catch (error) {
		return res.status(500).json({
			response: false,
			message: "Waduh, terjadi kesalahan di server kami!",
		});
	}
};

const link_reset_password_belum_pernah_terkirim = async (req, res, next) => {
	// parsing email data from body
	const { email } = req.body;

	try {
		// mengecek apakah email tersebut udah pernah terdaftar tetapi sudah pernah dikirimin token
		const resultInUnverifiedEmails = await db.query(
			"SELECT * FROM unverified_email_lupa_password WHERE email = $1",
			[email]
		);
		if (resultInUnverifiedEmails.rows.length > 0) {
			// mengambil waktu expire token di database
			const getExpiresAt = resultInUnverifiedEmails.rows[0].expires_at;

			// mendapatkan waktu sekarang
			const now = new Date();

			// Menghitung selisih antara kedua waktu
			const diffTime = Math.abs(now - getExpiresAt);

			// konversi ke menit detik
			const diffMinutes = Math.ceil(diffTime / (1000 * 60));
			const diffSeconds = Math.ceil(diffTime / 1000);

			return res.status(400).json({
				response: false,
				message: `Maaf, kami telah mengirimkan link reset password ke email tersebut sebelumnya coy, silahkan coba kembali sekitar ${diffMinutes}-menitan atau lebih tepatnya ${diffSeconds}-detik lagi ya coy!`,
			});
		}

		return next();
	} catch (error) {
		return res.status(500).json({
			response: false,
			message: "Waduh, terjadi kesalahan di server kami!",
		});
	}
};

const link_reset_password_sudah_di_tekan_dan_sesi_belum_habis = async (
	req,
	res,
	next
) => {
	// parsing email data from body
	const { email } = req.body;

	try {
		// mengecek apakah email tersebut sudah terverifikasi atau belum
		const isVerified = await db.query(
			"SELECT is_verified FROM unverified_email_lupa_password WHERE email = $1",
			[email]
		);
		// jika email tersebut tidak ada di table unverified emails, maka link reset password belum dikirim ke email tersebut
		// jika email tersebut ada di table unverified emails dan status is_verified nya belum true, maka user belum menekan tombol reset password
		if (isVerified.rows.length === 0 || !isVerified.rows[0].is_verified) {
			return res.status(403).json({
				response: false,
				message: `Maaf, Reset password tidak bisa dilakukan, sepertinya sesi anda telah habis. Jika tidak, mungkin karna email ${email} belum terverifikasi di sistem kami, silahkan tekan tombol verifikasi terlebih dahulu yang telah kami kirimkan ke email anda sebelumnya!`,
			});
		}
		return next();
	} catch (error) {
		return res.status(500).json({
			response: false,
			message: "Waduh, terjadi kesalahan di server kami!",
		});
	}
};

module.exports = {
	email_sudah_terdaftar,
	link_reset_password_belum_pernah_terkirim,
	link_reset_password_sudah_di_tekan_dan_sesi_belum_habis,
};
