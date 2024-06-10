// from external library
const express = require("express");
const cors = require("cors");

// importing middleware
const validasi_email = require('./middlewares/validasi_email');

// importing services
const { verifikasi_token, kirim_link_verifikasi, register_akun_mahasiswa} = require('./services/register');
const { verifikasi_login } = require("./services/login");

require('./utils/cleanup_expires_token');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// allowing cors and body parser json request
app.use(cors());
app.use(express.json());

// endpoint routes
app.post("/kirim-link-verifikasi", validasi_email, kirim_link_verifikasi);
app.post("/verifikasi-token", verifikasi_token);
app.post("/register", register_akun_mahasiswa);
app.post("/login", verifikasi_login);

app.listen(port, () => {
	console.log(`SIPTATIF API Started on port ${port}`);
});

