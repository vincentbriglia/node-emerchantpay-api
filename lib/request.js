'use strict';

var _ = require('lodash'),
    request = require('request'),
    parseXMLString = require('xml2js').parseString;

function makeRequest(options, callback) {

    options = options || {};
    options.options = options.options || {};

    // set baseUrl
    options.options.baseUrl = options.options.baseUrl || options.context.config.baseUrl;

    options.options.method = options.options.method ? options.options.method.toLowerCase() : 'post';

    // set form
    options.options.form = _.merge({
        'client_id': options.context.config.client_id,
        'api_key': options.context.config.api_key
    }, options.options.form);

    var missingParams = _.difference(options.requiredParams, _.keys(options.options.form));

    if (missingParams.length) {
        callback(new Error('Missing required parameters: ' + missingParams.join(', ')));
        return null;
    }

    return request[options.options.method](options.uri, options.options, function (err, response, body) {
        if (err) {
            return callback(err);
        } else {
            if (options.context.config.parseXML) {
                return parseXMLString(body, {
                    explicitRoot: true,
                    explicitArray: true,
                    ignoreAttrs: true
                }, function (error, result) {
                    if (error) {
                        return callback(error);
                    }

                    return callback(null, result);
                });
            }
            return callback(null, body);
        }

    });
}

module.exports = makeRequest;
