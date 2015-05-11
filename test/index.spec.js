'use strict';
var assert = require('assert'),
    EmpAPI = require('./../index');

describe('EmpAPI', function () {

    var clientId = '123456',
        apiKey = 'abcdefghijklmnopqrstuvwxyz';

    describe('Configuration', function () {

        it('should fail if neither config.client_id or config.api_key is set', function (done) {
            assert.throws(function () {
                return new EmpAPI();
            }, Error);
            done();
        });

        it('should fail if only config.client_id is not set', function (done) {
            assert.throws(function () {
                return new EmpAPI({
                    'client_id': clientId
                });
            }, Error);
            done();
        });

        it('should fail if only config.api_key is not set', function (done) {
            assert.throws(function () {
                return new EmpAPI({
                    'api_key': apiKey
                });
            }, Error);
            done();
        });

    });

});
