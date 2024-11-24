require("dotenv").config()
const express = require( "express" );
const cors = require("cors");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("./server/models/userModel");

const app = express();

app.use([
	cors(),
	morgan("dev"),
	express.json(),
	express.urlencoded({ extended: true }),
]);

// register route
app.post("/register", async (req, res) => {
	try {
		const { userName, password } = req.body;

		const user = await userModel.findOne({ userName });

		if (user) {
			return res.status(400).json({
				success: true,
				data: "user already exist",
				user: user,
			});
		}

		const salt = 10;

		bcrypt.hash(password, salt, async (err, hash) => {
			if (err) {
				return res.status(500).json({
					success: false,
					data: "Error hashing password",
				});
			}

			const createUser = new userModel({
				userName,
				password: hash,
			});

			await createUser.save();

			return res.status(201).json({
				success: true,
				data: "User registered successfully",
				user: createUser,
			});
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			data: "Server error",
		});
	}
});
// profile route
app.get("/profile", (req, res) => {
	res.status(200).json({
		data: "success",
	});
});

app.get("/login", async (req, res) => {
	try {
		const { userName, password } = req.body;
		const user = await userModel.findOne({ userName: userName });
		if (!user) {
			return res.status(401).json({
				success: false,
				message: "user not found",
				user: user,
			});
		}
		if (!bcrypt.compareSync(password, user.password)) {
			return res.status(401).json({
				success: false,
				message: "incorrect pasasword",
				user: userName,
			} );
			
		}
		const payload = {
			id: user._id,
			userName: user.userName,
		};
		const key = process.env.SECRET_KEY;
		const token = jwt.sign( payload, key, {
			expiresIn : "2d"
		} );
		return res.status( 200 ).json( {
			success: true,
			message: "user login successfully",
			user: user,
			token: "Bearer "+token,
		})
		
	} catch (error) {
		return res.status(500).json({
			success: false,
			data: "Server error",
		});
	}

});

// health route
app.get("/health", (req, res) => {
	res.status(200).json({
		success: true,
		data: {
			message: "success",
		},
	});
});

//  home route
app.get("/", (req, res) => {
	res
		.status(200)
		.send(`<h1> welcome to the server </h1>`)
		.json({
			success: true,
			data: {
				message: "home page ",
			},
		});
});

// not found handler
app.use((req, res, next) => {
	res.status(404).json({
		success: false,
		data: {
			message: "resource not found",
		},
	});
	next();
});

app.use((error, req, res, next) => {
	res.status(500).json({
		success: false,
		data: {
			message: "server error",
		},
	});
});
module.exports = app;
