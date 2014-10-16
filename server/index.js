var path = require('path');
var koala = require('./lib');
var config = require('./config/config');
var fs = require('fs');
var jwt = require('koa-jwt');
var mongo = require('./config/mongo');
var mongoSeed = require('./config/mongo-seed');
var co = require('co');
var resolve = require('path').resolve

var dist = resolve(__dirname + '/../dist');
var app = koala({
    livereload: {
        excludes: ['/modules']
    },
    fileServer: {
        root: dist,
        maxage: config.app.cacheTime
    }
});

app.init = co(function *(overwriteDB) {
    // initialize mongodb and populate the database with seed data if empty
    yield mongo.connect();
    yield mongoSeed(overwriteDB);

    // register special controllers which should come before any jwt token check and be publicly accessible
    require('./controllers/public').init(app);
    require('./controllers/login').init(app);

    // serve the static files in the /client directory, use caching only in production (7 days)
    var sendOpts = config.app.env === 'production' ? {root: dist, maxage: config.app.cacheTime} : {root: dist};
    var send = require('koa-file-server')(sendOpts).send;

    app.use(function *(next) {

        // do not handle /api paths
        if (this.path.substr(0, 5).toLowerCase() === '/api/') {
            yield next;
            return;
        } else if (yield send(this, this.path)) {
            // file exists and request successfully served so do nothing
            return;
        } else if (this.path.indexOf('.') !== -1) {
            // file does not exist so do nothing and koa will return 404 by default
            // we treat any path with a dot '.' in it as a request for a file
            return;
        } else {
            yield send(this, 'index.html');
        }
    });

    // middleware below this line is only reached if jwt token is valid
    app.use(jwt({secret: config.app.secret}));

    // mount all the routes defined in the api controllers
    fs.readdirSync('./server/controllers').forEach(function (file) {
        require('./controllers/' + file).init(app);
    });

    app.listen(config.app.port);

    console.log('Listening on port: ' + config.app.port);
    console.log('Running app in environment: ' + config.app.env);

});


if (!module.parent) {
    app.init();
}
