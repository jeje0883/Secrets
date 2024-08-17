const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.errorHandler = (err, req, res, next) => {
	console.error(err);

	const errorMessage = err.message || "Internal Server Error";

	res.json({
		error: {
			message: errorMessage,
			errorCode: err.code || "SERVER_ERROR",
			details: err.details || null
		}
	})
}