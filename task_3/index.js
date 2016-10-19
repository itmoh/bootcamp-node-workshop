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
}
app.use('/public', express.static('public', options));

app.get('/', function (req, res) {
	res.locals.prefix = 'test';
	res.render('index', { message: 'Hello there!' });;
});

app.use('/user', userMiddleware);


app.listen(port, function () {
	console.log('Example app listening on port' + port);
});
