
/**
 * Attach middleware and such to the app.
 */

var config = require('../../config/config');

/**
 * To do: make the handlers simply renderers,
 * and do all the error logic ourselves.
 */

function* errorHandler(next) {
    yield* this.app.errorHandler.call(this, next);
}

function* pageNotFoundHandler(next) {
    yield* this.app.pageNotFoundHandler.call(this, next);
}

module.exports = function (app, options) {
    options = options || {};

    // methods
    if (options.responseTime !== false) app.use(require('koa-response-time')());
    app.use(require('./trace'));

    if (config.app.env !== 'test') {
        app.use(require('koa-logger')(options.logger));
    }
    if (config.app.env === 'development') {
        app.use(require('koa-livereload')(options.livereload));
    }

    app.use(require('koa-router')(app));

    app.use(require('koa-compress')(options.compress));

    require('./headers')(app, options.security);

    // delegate to the app's error handler
    app.use(errorHandler);
    // throw 404 pages
    app.use(pageNotFoundHandler);

    app.use(require('./conditional-get')(options.etag));

    // app.use(require('koa-normalize')());
    app.use(require('koa-file-server')(options.fileServer));
    if (options.polyfills !== false)
        app.use(require('koa-polyfills')(options.polyfills));
    if (options.cash)
        app.use(require('koa-cash')(options.cash));

    app.use(require('koa-json')(options.json));
    if (options.session !== false)
        app.use(require('koa-session')(options.session));

    return app;
}
