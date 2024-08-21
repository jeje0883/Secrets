const express = require('express');
const passport = require("passport");
const userController = require('../controllers/userController');
const { verify, isLoggedIn } = require('../auth/auth');

const router = express.Router();

router.get('/', userController.getUsers);

router.post('/register', userController.registerUser);

router.post('/login', userController.userLogin);

// router.get('/logout', verify, userController.logout);

// router.get('/profile', verify, userController.profile);

router.get("/google",
	passport.authenticate("google", {
		scope: ["email", "profile"],
		prompt: "select_account"
	})
);

// Callback for Google OAuth Authentication
router.get("/google/callback",
	passport.authenticate("google", {
		failureRedirect: "/users/failed",
	}),
	function (req, res) {
		res.redirect("/users/success")
	}
)

// Route for failed Google OAuth
router.get("/failed", (req, res) => {
	console.log("User is not authenticated");
	res.send("Failed")
})

// Route for success
router.get("/success", isLoggedIn, (req, res) => {
	console.log("You are logged in")
	console.log(req.user)
	res.send(`Welcome ${req.user.displayName}`)
})

// Google Logout
router.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.log("Error while destroying session", err)
		} else {
			req.logout(() => {
				console.log("You are logged out");
				res.redirect("/")
			})
		}
	})
})


module.exports = router;