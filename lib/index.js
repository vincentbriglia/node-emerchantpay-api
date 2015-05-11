var _ = require('lodash'),
    request = require('request'),
    async = require('async'),
    parseXMLString = require('xml2js').parseString;

function EmerchantPay(config) {

    'use strict';

    var defaults = {
        parseXML: true
    };

    this.config = _.merge(defaults, config || {});

    if (!this.config.client_id) {
        throw new Error('config.client_id not set');
    }

    if (!this.config.api_key) {
        throw new Error('config.api_key not set');
    }

    // allow chaining
    return this;

}

EmerchantPay.prototype.setConfig = function (key, value) {
    'use strict';
    this.config[key] = value;
};

EmerchantPay.prototype.request = function (url, params, callback) {

    'use strict';

    var self = this;

    params = _.merge({
        'client_id': this.config.client_id,
        'api_key': this.config.api_key
    }, params);

    function requestAndParse(cb) {
        request.post('http://proxy.aws/service/order/search', {
            form: params
        }, function (err, response, body) {

            if (err) {
                return cb(err);
            } else {
                if (self.config.parseXML) {
                    return parseXMLString(body, {
                        explicitRoot: true,
                        explicitArray: true,
                        ignoreAttrs: true
                    }, function (error, result) {
                        if (error) {
                            return cb(error);
                        }

                        // console.log(require('prettyjson').render(result));
                        return cb(null, result);
                    });
                }
                return cb(null, body);
            }

        });
    }

    async.waterfall([
        requestAndParse
    ], function (err, result) {
        callback(err, result);
    });
};

module.exports = EmerchantPay;
