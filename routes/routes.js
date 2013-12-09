// User model
var User = require('../model/user');
var msg = require('../config/config').message;

module.exports = function(app) {
	app.get('/*', function(req, res, next) {
		req.session.msg = msg.DEFAULT;
		next();
	});

	// Home
	app.get('/', function(req, res) {
		res.render('index', {
			title: 'Coder Manual'
		});
	});

	// Sign up
	app.get('/signup', function(req, res) {	
		// layout: 'l2',
		res.render('signup', {
			title: 'Sign up'
		});
	});

	// Sign up function
	app.post('/signup', function(req, res) {
		var newUser = new User({
			email: req.body.email,
			password: req.body.password
		});

		User.get(newUser.email, function(err, user) {
			if (err) {
				req.session.msg = msg.ERR_SYS;
				return res.redirect('/signup');
			}
			if (user) {
				req.session.msg = msg.ERR_ACCOUNT_EXIST;
				return res.redirect('/signup');
			}
			newUser.save(function(err) {
				if (err) {
					// req.flash('error', err);
					req.session.message = err;
					return res.redirect('/signup');
				}
				req.session.user = newUser;
				req.session.msg = msg.SUCC_SIGNUP;
				res.redirect('/profile');
			});
		});
	});

	// Login
	app.get('/login', function(req, res) {
		res.render('login', {
			title: 'Login'
		});
	});

	// Login function
	app.post('/login', function(req, res) {
		User.get(req.body.email, function(err, user) {			
			if (!user) {
				req.session.msg = msg.ERR_LOGIN;
				return res.redirect('/login');
			}
			if (user.password != req.body.password) {
				req.session.msg = msg.ERR_LOGIN;
				res.redirect('/login');
			}
			if (user.password == req.body.password) {
				req.session.user = user;
				req.session.msg = msg.SUCC_LOGIN;
				res.redirect('/profile');
			}
		});
	});

	// Logout
	app.get('/logout', function(req, res) {
		req.session.user = null;
		req.session.msg = msg.SUCC_LOGOUT;
		res.redirect('/');
	});

	// Profile
	app.get('/profile', function(req, res) {
		res.render('profile', {
			title: 'Profile'
		});
	});
};