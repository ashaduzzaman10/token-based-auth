require("dotenv").config();

const mongoose = require("mongoose");

const dbUrl = process.env.DBURL || "mongodb://localhost:27017/auth-tokenDB";

const dbConnection = async () => {
	try {
		await mongoose.connect(dbUrl);
		console.log(`db is connected successfully `);
	} catch (error) {
		console.log(`db connection failed ${error.message}`);

		process.exit(1);
	}
};

module.exports = dbConnection;
