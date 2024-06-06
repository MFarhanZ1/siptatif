const crypto = require('crypto');
const { transporter } = require('../config/mail');
const db = require('../config/db');
const { response } = require('express');

require('dotenv').config();

const verifikasi_token = async (req, res) => {
    const { __token_verification } = req.body;
    const result = await db.query('SELECT * FROM unverified_emails WHERE verification_token = $1', [__token_verification]);
    
    if (result.rows.length === 0) {
        return res.status(400).json({ 
            response: false,
            message: 'Token tidak valid!' 
        });
    }
    
    db.query('DELETE FROM unverified_emails WHERE verification_token = $1', [__token_verification]);
    res.json({
        response: true,
        message: 'Token valid!',
        results: result.rows
    });
}


const kirim_link_verifikasi = async (req, res) => {

    // mengambil data email dari user
    const { email } = req.body;
    
    // pembuatan token dan verifikasi link yang akan dikirim ke email
    const token = crypto.randomBytes(32).toString('hex');
    const verificationLink = process.env.VERIFICATION_LINK + token;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: '[SIPTATIF VERIFICATION] - Verifikasi Email untuk Registrasi Akun SIPTATIF',
        text: `Click on this link to verify your email: ${verificationLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({
                response: false,
                message: 'Maaf, sepertinya email anda tidak tepat!'
            });
        }
    });

    // generate token expires
    const expiresAt = new Date(Date.now() + 60000); // 1 hour from now

    // insert into unverified_emails with token
    db.query('INSERT INTO unverified_emails (email, verification_token, expires_at) VALUES ($1, $2, $3)', [email, token, expiresAt]);

    return res.status(200).json({
        response: true,
        message: `Sukses mengirim link verifikasi ke email ${email}! silahkan cek, lalu tekan link untuk memverifikasinya!`
    });
}


module.exports = {
    verifikasi_token,
    kirim_link_verifikasi
}