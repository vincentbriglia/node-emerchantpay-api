'use strict';

var _ = require('lodash'),
    apis = require('./apis')();

function Client(config) {

    var defaults = {
        parseXML: true,
        baseUrl: 'https://my.emerchantpay.com/service'
    };

    this.config = _.merge(defaults, config || {});

    if (!this.config.client_id) {
        throw new Error('config.client_id not set');
    }

    if (!this.config.api_key) {
        throw new Error('config.api_key not set');
    }

    this.attachAPIs(apis);

    // allow chaining
    return this;

}

Client.prototype.setConfig = function (key, value) {
    this.config[key] = value;
};

Client.prototype.setBaseUrl = function (baseUrl) {
    this.setConfig('baseUrl', baseUrl);
};

Client.prototype.attachAPIs = function (apiList) {
    var self = this;
    _.each(apiList, function (value, key) {
        self[key] = value.bind(self);
    });
};

module.exports = Client;
