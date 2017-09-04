'use strict';

var walkDir = require('walkdir'),
  path = require('path'),
  debug = require('debug')('node-emerchantpay-api:api');

function ApiList() {
  var apis = {};

  debug('try require file in this path: ', path.normalize(__dirname));

  walkDir.sync(
    path.normalize(__dirname),
    {
      no_recurse: true,
    },
    function(p, stat) {
      if (stat.isFile()) {
        return;
      }
      try {
        debug('try require file', p);
        apis[path.basename(p)] = require(path.resolve(p));
      } catch (err) {
        // hard to reproduce error
        /* istanbul ignore next */
        if (err.code === 'MODULE_NOT_FOUND') {
          console.log(err);
        }
      }
    }
  );

  return apis;
}

module.exports = ApiList;
