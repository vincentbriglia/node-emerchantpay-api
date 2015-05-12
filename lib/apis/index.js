'use strict';

var walkDir = require('walkdir'),
    path = require('path'),
    debug = require('debug')('node-emerchantpay-api:api');

module.exports = (function APIs() {
    var apis = {};
    walkDir.sync(path.normalize(__dirname), {
        'no_recurse': true
    }, function (p, stat) {
        if (stat.isFile()) {
            return;
        }
        try {
            debug('try require file', p);
            apis[path.basename(p)] = require(path.resolve(p));
        }
        catch (err) {
            if (err.code === 'MODULE_NOT_FOUND') {
                console.log(err);
            }
        }
    });
    return apis;
})();
