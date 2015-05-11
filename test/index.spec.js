'use strict';
var assert = require('assert'),
    request = require('request'),
    sinon = require('sinon'),
    _ = require('lodash'),
    EmpAPI = require('./../lib/index');

describe('eMerchantPay API', function () {

    var empAPI,
        clientId = '123456',
        apiKey = 'abcdefghijklmnopqrstuvwxyz';

    describe('configuration', function () {

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

    describe('well formed responses', function () {

        beforeEach(function (done) {

            empAPI = new EmpAPI({
                'client_id': clientId,
                'api_key': apiKey
            });

            sinon
              .stub(request, 'post')
              .yields(null, {}, '<?xml version="1.0" encoding="UTF-8"?><orders><num_records>0</num_records></orders>');

            done();
        });

        afterEach(function (done) {
            request.post.restore();
            done();
        });

        it('can convert xml response to json', function (done) {
            empAPI.request('', {
                date: '2015-05-03'
            }, function (err, results) {
                assert.equal(err, null);
                assert.equal(results.orders.num_records, 0);
                done();
            });

        });

        it('can also get raw xml response', function (done) {
            empAPI.setConfig('parseXML', false);
            empAPI.request('', {
                date: '2015-05-03'
            }, function (err, results) {
                assert.equal(err, null);
                assert.equal(results, '<?xml version="1.0" encoding="UTF-8"?><orders><num_records>0</num_records></orders>');
                empAPI.setConfig('parseXML', true);
                done();
            });
        });

    });

    describe('malformed responses', function () {

        beforeEach(function (done) {
            empAPI = new EmpAPI({
                'client_id': clientId,
                'api_key': apiKey
            });
            done();
        });

        afterEach(function (done) {
            request.post.restore();
            done();
        });

        it('throws an error on a bad response', function (done) {

            sinon
              .stub(request, 'post')
              .yields('an error description');

            empAPI.request('', {
                date: '2015-05-03'
            }, function (err, results) {
                assert.equal(err, 'an error description');
                assert.equal(results, null);
                done();
            });

        });

        it('throws an error on malformed xml response', function (done) {

            sinon
              .stub(request, 'post')
              .yields(null, {}, '<?xml version="1.0" encoding="UTF-8"?><orders<num_records>0</num_records></orders>');

            empAPI.request('', {
                date: '2015-05-03'
            }, function (err, results) {
                assert.equal(results, null);
                assert.equal(_.isError(err), true);
                done();
            });

        });

    });

});
