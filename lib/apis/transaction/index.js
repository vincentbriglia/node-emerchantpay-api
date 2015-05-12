'use strict';

var makeRequest = require('../../request');

function Transaction(options) {

    var self = this;

    this.options = options || {};

    // this.cancelrebill = {

    //     post: function (params, callback) {
    //         return makeRequest(params, callback);
    //     }

    // };

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
            var requestParams = {
                uri: '/order/transaction/',
                options: {
                    method: 'POST',
                    form: params
                },
                validationSchema: [],
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

module.exports = Transaction;
