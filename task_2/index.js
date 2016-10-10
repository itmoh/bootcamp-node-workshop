var http = require('http'),
    fs = require('fs');
through = require('through2');

    require('dotenv').load();

var port = process.env.SERVER_PORT;
var fileName = process.env.FILE_NAME;

http.createServer(function (req, res) {
    if (req.method === 'POST') {
        req.on('end', function() {
            res.writeHead(200, {
                'Content-Type':'application/json'
            });
            res.end(JSON.stringify({
                done: true
            }));
        });
        var ws = fs.createWriteStream(fileName, {
            flags: 'a'
        });
        var transformStream = createTransformStream();
        req.pipe(transformStream).pipe(ws);
        return;
    }
    res.end('send me a POST\n')
}).listen(port);

function createTransformStream() {
    return through(write);
}

function write(buffer, encoding, next) {
    var string = buffer.toString();
    var result = string.toUpperCase() + '\n';
    this.push(result);
    next();
}
console.log('node server running on port ' + port);
