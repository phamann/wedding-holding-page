var path = require('path');
var koala = require('./lib');

var fs = require('fs');

var PORT = process.env.PORT || 5000;
var ENV = process.env.NODE_ENV || 'development';

var app = koala({
    fileServer: {
        root: __dirname + '/dist/',
        index: true,
        maxAge: '1 day'
    }
});

app.listen(PORT);

console.log('Listening on port: ' + PORT);
console.log('Running app in environment: ' + ENV);
