'use strict';

var _ = require('lodash'),
    request = require('request'),
    parseXMLString = require('xml2js').parseString,
    revalidator = require('revalidator'),
    debug = require('debug')('node-emerchantpay-api:request');


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

    options.validationSchema = _.merge({
        'client_id': {
            description: 'the url the object should be stored at',
            type: 'number',
            maxLength: 12,
            required: true
        },
        'api_key': {
            description: 'a means of protecting data (insufficient for production, used as example)',
            type: 'string',
            maxLength: 20,
            required: true
        }
    }, options.validationSchema);

    var schemaValidation = revalidator.validate(options.options.form, {
        properties: options.validationSchema
    });

    // var missingParams = _.difference(options.requiredParams, _.keys(options.options.form));

    debug('schema validation: "%o"', schemaValidation);

    if (!schemaValidation.valid) {
        callback(new Error('Missing required parameters'));
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
