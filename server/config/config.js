'use strict';

/**
 * Environment variables and application configuration.
 */

var path = require('path'),
    _ = require('lodash');

var baseConfig = {
    app: {
        root: path.normalize(__dirname + '/../..'),
        env: process.env.NODE_ENV,
        secret: process.env.APP_SECRET
    }
};

var platformConfig = {
    development: {
        app: {
            port: 3000,
            secret: 'foobar'
        },
        mongo: {
            url: 'mongodb://localhost:27017/koan-dev'
        },
        oauth: {
            facebook: {
                clientId: '231235687068678',
                clientSecret: '4a90381c6bfa738bb18fb7d6046c14b8',
                callbackUrl: 'http://localhost:3000/signin/facebook/callback'
            },
            google: {
                clientId: '147832090796-ckhu1ehvsc8vv9nso7iefvu5fi7jrsou.apps.googleusercontent.com',
                clientSecret: 'MGOwKgcLPEfCsLjcJJSPeFYu',
                callbackUrl: 'http://localhost:3000/signin/google/callback'
            }
        }
    },

    test: {
        app: {
            port: 3001
        },
        mongo: {
            url: 'mongodb://localhost:27017/koan-test'
        }
    },

    production: {
        app: {
            port: process.env.PORT || 3000,
            cacheTime: 1000 * 60 * 60 * 24 * 7  /* default caching time (7 days) for static files, calculated in milliseconds */
        },
        mongo: {
            url: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/koan'
        },
        oauth: {
            facebook: {
                clientId: '231235687068678',
                clientSecret: '4a90381c6bfa738bb18fb7d6046c14b8',
                callbackUrl: 'http://koanjs.com/signin/facebook/callback'
            },
            google: {
                clientId: '147832090796-ckhu1ehvsc8vv9nso7iefvu5fi7jrsou.apps.googleusercontent.com',
                clientSecret: 'MGOwKgcLPEfCsLjcJJSPeFYu',
                callbackUrl: 'http://koanjs.com/signin/google/callback'
            }
        }
    }
};

// override the base configuration with the platform specific values
module.exports = _.merge(baseConfig, platformConfig[baseConfig.app.env || (baseConfig.app.env = 'development')]);