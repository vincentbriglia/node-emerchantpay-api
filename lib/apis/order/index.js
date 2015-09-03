'use strict';

var _ = require('lodash'),
    makeRequest = require('../../request');

function Order(options) {

    var self = this;

    this.options = options || {};

    this.cancelrebill = {

        post: function (params, callback) {

            var schema = {
                'notify': {
                    description: 'Allows disabling of merchant notifications for this order. Notifications must be enabled, and a notification URL configured in your Account settings. 0 – Disabled, 1 – Enabled (Default)',
                    type: 'number',
                    maxLength: 1
                },
                'item_id': {
                    description: 'Unique Rebilling Identifier of the Rebill for cancellation. Returned in Notifications or available via the Gateway.',
                    type: 'number',
                    maxLength: 12,
                    required: true
                },
                'reason': {
                    description: 'Rebill ID. If this field is present all other fields are ignored',
                    type: 'string',
                    maxLength: 100
                }
            };

            var requestParams = {
                uri: '/order/cancelrebill/',
                options: {
                    method: 'POST',
                    form: params
                },
                schema: schema,
                context: self
            };

            return makeRequest(requestParams, callback);
        }

    };

    // this.cft = {

    //     post: function (params, callback) {
    //         return makeRequest(params, callback);
    //     }

    // };

    // this.credit = {

    //     post: function (params, callback) {
    //         return makeRequest(params, callback);
    //     }

    // };

    // this.instantupgrade = {

    //     post: function (params, callback) {
    //         return makeRequest(params, callback);
    //     }

    // };

    // this.payout = {

    //     post: function (params, callback) {
    //         return makeRequest(params, callback);
    //     }

    // };

    // this.rebill = {

    //     post: function (params, callback) {
    //         return makeRequest(params, callback);
    //     }

    // };

    this.search = {

        post: function (params, callback) {

            var schema = {
                'order_id': {
                    description: 'Order ID. If this field is present all other fields are ignored',
                    type: 'number'
                },
                'trans_id': {
                    description: 'Transaction ID. If this field is present all other fields are ignored',
                    type: 'number'
                },
                'rebill_id': {
                    description: 'Rebill ID. If this field is present all other fields are ignored',
                    type: 'number'
                },
                'date': {
                    description: 'Order Creation date returns all orders created on this date. In the format YYYY-MM-DD This field is mandatory if the order_id,trans_id, rebill_id and reference fields are not present.',
                    type: 'string',
                    format: 'date'
                },
                'include_risk_data': {
                    description: 'Allows Risk Data from all Risk Providers queried during this transaction to be retrieved along with the transaction details.',
                    type: 'number',
                    maxLength: 1,
                    default: null
                }
            };

            // if none of the parameters in the array are set, date is required
            var dateRequired = _.filter([
                'order_id',
                'trans_id',
                'rebill_id'
            ], function (n) {
                return !_.isUndefined(params[n]);
            }).length === 0;

            if (dateRequired) {
                schema.date.required = true;
            }

            var requestParams = {
                uri: '/order/search/',
                options: {
                    method: 'POST',
                    form: params
                },
                schema: schema,
                context: self
            };

            return makeRequest(requestParams, callback);
        }

    };

    // this.settle = {

    //     post: function (params, callback) {
    //         return makeRequest(params, callback);
    //     }

    // };

    // this.submit = {

    //     post: function (params, callback) {
    //         return makeRequest(params, callback);
    //     }

    // };

    // this.void = {

    //     post: function (params, callback) {
    //         return makeRequest(params, callback);
    //     }

    // };

    return self;

}

module.exports = Order;
