const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();

app.use([
	cors(),
	morgan("dev"),
	express.json(),
	express.urlencoded({ extended: true }),
]);

module.exports = app;
