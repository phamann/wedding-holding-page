'use strict';

/**
 * Remote debugging tools controller for the API. Remove this controller in production if you don't want random people dropping your database!
 */

var mongoSeed = require('../config/mongo-seed');

// register koa routes
exports.init = function (app) {
    app.post('/api/debug/clearDatabase', clearDatabase);
};

function *clearDatabase() {
    // todo: check user role === 'admin' when role system is ready
    yield mongoSeed(true);
    this.status = 200;
}