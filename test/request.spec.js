'use strict';
var assert = require('assert'),
    sinon = require('sinon'),
    request = require('request'),
    makeRequest = require('./../lib/request'),
    _ = require('lodash');

describe('eMerchantPay API Request', function () {

    var validXML = '<?xml version="1.0" encoding="UTF-8"?><orders><num_records>0</num_records></orders>';
    //     clientId = 123456,
    //     apiKey = '164684684684684',
    //     validJSON = JSON.parse('{"orders":{"num_records":["0"]}}'),
    //     invalidXML = '<?xml version="1.0" encoding="UTF-8"?><orders<num_records>0</num_records></orders>';

    describe('configuration', function () {

        it('should throw an error if no callback is set', function (done) {
            assert.throws(function () {
                makeRequest();
            }, Error);
            done();
        });

        it('should throw if options object is empty', function (done) {
            makeRequest({}, function (err, results) {
                assert.equal(results, null);
                assert.equal(_.isError(err), true);
                done();
            });
        });

        // var requestParams = {
        //     uri: '/order/search/',
        //     options: {
        //         method: 'POST',
        //         form: params
        //     },
        //     validationSchema: validationSchema,
        //     context: self
        // };

        it('should throw if either api_key is missing', function (done) {
            makeRequest({
                options: {
                    form: {
                        'client_id': 123
                    }
                }
            }, function (err, results) {
                assert.equal(results, null);
                assert.equal(_.isError(err), true);
                done();
            });
        });

        it('should throw if client_id is missing', function (done) {
            makeRequest({
                options: {
                    form: {
                        'api_key': '123'
                    }
                }
            }, function (err, results) {
                assert.equal(results, null);
                assert.equal(_.isError(err), true);
                done();
            });
        });

        it('should throw if uri is missing', function (done) {
            makeRequest({
                options: {
                    form: {
                        'client_id': 123,
                        'api_key': '123'
                    }
                }
            }, function (err, results) {
                assert.equal(results, null);
                assert.equal(_.isError(err), true);
                done();
            });
        });

        it('should throw if uri is missing', function (done) {

            sinon
              .stub(request, 'post')
              .yields(null, {}, validXML);

            makeRequest({
                uri: 'http://proxy.aws/service/order/search',
                options: {
                    method: 'POST',
                    form: {
                        'client_id': 123,
                        'api_key': '123'
                    }
                }
            }, function (err, results) {
                assert.equal(err, null);
                assert.equal(results, validXML);
                done();
            });
        });


    });

});
