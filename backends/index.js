// from external library
const express = require("express");
const cors = require("cors");

// importing middleware
const validasi_email = require('./middlewares/validasi_email');

// importing services
const { verifikasi_token, kirim_link_verifikasi} = require('./services/auth_register');
const db = require("./config/db");

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

app.get('/', (req, res) => {
	db.query('SELECT * FROM unverified_emails', (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.json({
				results: result.rows
			});
		}
	})
})

app.listen(port, '192.168.158.133', () => {
	console.log(`SIPTATIF API Started on port ${port}`);
});

