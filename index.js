var path = require('path');
var koala = require('./lib');
var spdy = require('spdy');
var keys = require('spdy-keys');
var fs = require('fs');

var PORT = process.env.PORT || 5000;
var ENV = process.env.NODE_ENV || 'development';

var app = koala({
    fileServer: {
        root: __dirname + '/dist/',
        index: true,
        maxAge: '1 year'
    }
});

//app.get('/', function *(next) {
//    yield* this.fileServer.send('index.html');
//    if (this.isSpdy) {
//        yield* this.fileServer.push('css/global.css');
//        yield* this.fileServer.push('js/circles.js');
//    }
//});

//var server = spdy.createServer({
//    key: fs.readFileSync('server.key'),
//    cert: fs.readFileSync('server.crt'),
//    ca: fs.readFileSync('server.csr')
//}, app.callback());

//var server = spdy.createServer(keys, app.callback());
//
//server.listen(PORT);

app.listen(PORT);

console.log('Listening on port: ' + PORT);
console.log('Running app in environment: ' + ENV);
