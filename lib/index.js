var _ = require('lodash'),
    request = require('request');

function EmerchantPay (config) {

    'use strict';

    var defaults = {
        parseXML: true
    }

    this.config = merge(defaults, config || {});

    if (!this.config.client_id) {
        throw new Error('config.client_id not set');
    }

    if (!this.config.api_key) {
        throw new Error('config.api_key not set');
    }

    // allow chaining
    return this;

}

module.exports = EmerchantPay;