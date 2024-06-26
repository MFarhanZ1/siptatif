const crypto = require("crypto");
const { transporter } = require("../config/mail");
const db = require("../config/db");

require("dotenv").config();

const kirim_link_lupa_password = async (req, res) => {
	// mengambil data email dari user
	const { email } = req.body;

	try {
		// pembuatan token dan verifikasi link sekaligus isi email yang akan dikirim ke email user
		const token = crypto.randomBytes(32).toString("hex");
		const verificationLink = process.env.RESET_PASSWORD_LINK + token;

		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: email,
			subject:
				"[SIPTATIF RESET PASSWORD] - Verifikasi Email untuk Reset Password Akun SIPTATIF",
			html: `
        <html>
            <head>
                <style>
                    .email-container {
                        width: 100%;
                        padding: 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: #f9f9f9;
                    }
                    .email-card {
                        width: 100%;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        font-family: Arial, sans-serif;
                    }
                    .email-header {
                        font-size: 20px;
                        font-weight: bold;
                        margin-bottom: 20px;
                        text-align: center;
                    }
                    .email-body {
                        font-size: 16px;
                        line-height: 1.5;
                        margin-bottom: 30px;
                    }
                    .email-button {
                        display: inline-block;
                        padding: 10px 20px;
                        font-size: 16px;
                        color: #ffffff;
                        background-color: #4CAF50;
                        text-align: center;
                        text-decoration: none;
                        border-radius: 5px;
                        transition: background-color 0.3s ease;
                    }
                    .email-button:hover {
                        background-color: #298040;
                    }
                    .email-footer {
                        font-size: 14px;
                        color: #555;
                        text-align: center;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="email-card">
                        <div class="email-header">
                            📧 Reset Password Akun SIPTATIF 📧
                        </div>

                        <div class="email-body">
                            <h4><i>Halo Sobat SIPTATIF UIN Suska Riau,</i><span> 😁😉</span></h4>
                            <p>Terima kasih sebelumnya telah menggunakan layanan SIPTATIF. Silakan klik tombol di bawah ini ya untuk mereset password akun anda: 👇</p>
                            <p style="text-align: center;">
                                <a style="color: #ffffff; text-decoration: none" href="${verificationLink}" class="email-button">Reset Password Sekarang</a>
                            </p>
                            <p>Jika Anda tidak meminta email ini, abaikan saja. 😊</p>
                        </div>
                        <div class="email-footer">
                            Hormat kami,<br/>Tim Dev SIPTATIF [M. Farhan Aulia Pratama & Farhan Fadhila]
                        </div>
                    </div>
                </div>
            </body>
        </html>
        `,
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return res.status(500).json({
					response: false,
					message: "Maaf, sepertinya email anda tidak tepat!",
				});
			}
		});

		// generate token expires
		const expiresAt = new Date(Date.now() + 600000); // 10 minutes from now will expire

		// insert into unverified_emails with token
		await db.query(
			"INSERT INTO unverified_email_lupa_password (email, verification_token, expires_at) VALUES ($1, $2, $3)",
			[email, token, expiresAt]
		);

		return res.status(200).json({
			response: true,
			message: `Sukses mengirim link reset password ke email ${email}! silahkan cek, lalu tekan tombol 'Reset Password Sekarang' untuk memverifikasinya!`,
		});
	} catch (error) {
		return res.status(500).json({
			response: false,
			message: "Waduh, sepertinya ada kendala di server kami!",
		});
	}
};

const verifikasi_token_lupa_password = async (req, res) => {
	const { __token_verification } = req.body;

	try {
		const results = await db.query(
			"SELECT * FROM unverified_email_lupa_password WHERE verification_token = $1",
			[__token_verification]
		);

		if (results.rows.length === 0) {
			return res.status(400).json({
				response: false,
				message:
					"Maaf, token anda tidak valid, sepertinya token anda telah expired, silahkan tekan tombol kirim link reset password kembali!",
			});
		}

		// updating verified email status
		await db.query(
			"UPDATE unverified_email_lupa_password SET is_verified = true WHERE verification_token = $1",
			[__token_verification]
		);

		res.json({
			response: true,
			message:
				"Selamat, token anda telah berhasil di verifikasi, kini anda diarahkan ke halaman reset password!",
			results: results.rows[0],
		});
	} catch (error) {
		return res.status(500).json({
			response: false,
			message: "Waduh, sepertinya ada kendala di server kami!",
		});
	}
};

// importing hash algorithm
const argon2 = require("argon2");

const reset_password = async (req, res) => {
	// mengambil data email dari user
	const { email, password } = req.body;

	// hashing password with argon2 algorithm and catch error
	let hashPassword;
	try {
		hashPassword = await argon2.hash(password);
	} catch (err) {
		return res.status(500).json({
			response: false,
			message: err.message,
		});
	}

	// call procedure reset_password to reset user account password
	try {
		// query execution
		await db.query("CALL reset_password( $1, $2 )", [email, hashPassword]);

		// return success response
		return res.status(200).json({
			response: true,
			message: `Yeay, reset password untuk email ${email} sukses cuy!, sebentar ya, kami akan mengarahkan kamu kehalaman login.`,
		});
	} catch (err) {
		return res.status(500).json({
			response: false,
			message: `Yah, reset password akun anda gagal! ${err.message}`,
		});
	}
};

module.exports = {
	kirim_link_lupa_password,
	verifikasi_token_lupa_password,
	reset_password,
};