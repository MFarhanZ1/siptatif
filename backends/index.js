// import from external library
const express = require("express");
const cors = require("cors");

// importing all available routes
const login_route = require("./routes/login_route");
const register_route = require("./routes/register_route");
const lupa_password_route = require("./routes/lupa_password_route");

require('./utils/cleanup_expires_token');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// allowing cors and body parser json request
app.use(cors());
app.use(express.json());

// importing all available routes
app.use(login_route);
app.use(register_route);
app.use(lupa_password_route);

// starting express api server to internal public ip and localhost
app.listen(port, '0.0.0.0', () => {
	console.log(`SIPTATIF API Started on port ${port}`);
});

