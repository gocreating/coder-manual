var express = require('express');
var routes = require('./routes/routes');

var config = require('./config/config');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(express);
var expressLayouts = require('express-ejs-layouts');

var app = express();
var port = process.env.PORT || 3000;

app.configure(function() {
	app.set('view engine', 'ejs');
	app.set('layout', 'layouts/main') // defaults to 'layout'

	app.use(express.cookieParser()); 
	app.use(express.bodyParser()); // = urlencoded() + json() + multipart()
	app.use(express.session({
		secret: config.cookieSecret,
		store: new MongoStore({
			db: config.db.name
		})
	}));
	// Easily save messages in session
	// app.use(flash());
	app.use(expressLayouts);
	// Automatically transmit variables to .ejs views
	app.use(function(req, res, next){
		res.locals.msg = req.session.msg;
		// res.locals.sta = req.session.status;
		// res.locals.msg = req.flash();
		res.locals.user = req.session.user;
		res.locals.session = req.session;
		next();
	});
});

// var livereload = require('livereload');
// var server = livereload.createServer({exts: ['ejs']});
// server.watch(__dirname + '/views');

// Routes all paths
routes(app);

// Start the server
app.listen(port);
console.log('Listening on port ' + port);