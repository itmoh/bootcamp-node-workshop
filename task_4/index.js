var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var morgan = require('morgan');

var app = express();
var userMiddleware = require('./user');
require('dotenv').load();

var port = process.env.SERVER_PORT;
var db = process.env.DB_URL;
var env = process.env.ENV;

app.set('view engine', 'ejs');
app.locals.title = 'My App';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
  
initMongoose(db);
initStatic(app);

app.get('/', function (req, res) {
	res.locals.prefix = 'test';
	res.render('index', { message: 'Hello there!' });;
});

app.get('/add', function (req, res) {
	res.locals.prefix = 'Add';
	res.render('add', { message: 'user!' });;
});

app.get('/update/:id', function (req, res) {
	var id = req.params.id;
	var User = require('./user.model');
	User.findById(req.params.id)
		.then(function (result) {
		res.render('update', {
			userId: id,
			prefix: 'Update',
			message: result.fullName,
			firstName: result.firstName,
			lastName: result.lastName
		});
	});
	
});

app.use('/user', userMiddleware);

if ('production' === env) {
	app.use(morgan('dev'));
}

if ('development' === env) {
	app.use(morgan('dev'));
	app.use(errorHandler()); // Error handler - has to be last
}

app.listen(port, function () {
	console.log('Example app listening on port: ' + port);
});

function initStatic(app) {
	var options = {
		dotfiles: 'ignore',
		maxAge: '1d'
	};
	app.use('/public', express.static('public', options));
}

function initMongoose(dbUrl) {
	mongoose.Promise = require('Q').Promise;
	mongoose.connect(dbUrl);

	mongoose.connection
		.on('connected', function() {
			console.log('Mongoose default connection open to ' + dbUrl)
		})
		.on('error', function(err) {
			console.log('Mongoose default connection error ' + err)
		})
		.on('disconnected', function() {
			console.log('Mongoose default connection disconnected')
		});

	process.on('SIGINT', function() {
		mongoose.connection.close(function() { 
			process.exit(0)
		});
	});
};
