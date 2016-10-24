var express = require('express');
var app = express();
var userMiddleware = require('./user');
require('dotenv').load();

var port = process.env.SERVER_PORT;

app.set('view engine', 'ejs');
app.locals.title = 'My App';

var options = {
	dotfiles: 'ignore',
	maxAge: '1d'
};

app.use('/public', express.static('public', options));

app.get('/', function (req, res) {
	// todo: you need to render index view with "test:Hello there!" header
});

// todo: use user middleware for "/user" route

app.listen(port, function () {
	console.log('Example app listening on port' + port);
});
