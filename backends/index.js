// import from external library
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');

// importing all available routes
const login_route = require("./routes/login_route");
const register_route = require("./routes/register_route");
const lupa_password_route = require("./routes/lupa_password_route");
const jwt_auth = require("./routes/jwt_auth_route");
const logout = require("./routes/logout_route");

// importing all services based on actor role actions
const admin_prodi = require("./routes/admin_prodi_route");

require('./utils/cleanup_expires_token');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// allowing cors and body parser json request
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// importing all available routes
app.use(login_route);
app.use(register_route);
app.use(lupa_password_route);
app.use(jwt_auth);
app.use(logout);

// importing all available routes based on each actor role actions
app.use(admin_prodi);

// starting express api server to internal public ip and localhost
app.listen(port, '0.0.0.0', () => {
	console.log(`SIPTATIF API Started on port ${port}`);
});

