var http = require('http'),
    fs = require('fs'),
    through = require('through2');

require('dotenv').load();

var port = process.env.SERVER_PORT;
var fileName = process.env.FILE_NAME;

function requestListener(req, res) {
    if (req.method === 'POST') {
        req.on('end', function() {
            res.writeHead(200, { 'Content-Type':'application/json' });

            // todo: write JSON.stringify({ done: true }) and end response

        });
        var ws = /* todo: create stream for write */(fileName, { flags: 'a' });

        var transformStream = createTransformStream();
        req.pipe(transformStream).pipe(ws);
        return;
    }
    res.end('send me a POST\n');
}

// todo: create server, use requestListener for handle requests and start it on port from "port" property

console.log('node server running on port ' + port);

function createTransformStream() {
    return through(write);
}

function write(buffer, encoding, next) {
    var string = buffer.toString();
    var result = string.toUpperCase() + '\n';
    this.push(result);
    next();
}
