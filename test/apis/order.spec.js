'use strict';
var assert = require('assert'),
  request = require('request'),
  sinon = require('sinon'),
  _ = require('lodash'),
  EmpAPI = require('./../../lib/index');

describe('eMerchantPay Order API', function() {
  var empAPI,
    order,
    clientId = 123456,
    apiKey = '164684684684684';

  before(function(done) {
    empAPI = new EmpAPI({
      client_id: clientId,
      api_key: apiKey,
    });
    order = empAPI.order();
    done();
  });

  describe('Search', function() {
    var validXML =
        '<?xml version="1.0" encoding="UTF-8"?><orders><num_records>0</num_records></orders>',
      validJSON = JSON.parse('{"orders":{"num_records":["0"]}}'),
      invalidXML =
        '<?xml version="1.0" encoding="UTF-8"?><orders<num_records>0</num_records></orders>';

    beforeEach(function(done) {
      sinon.stub(request, 'post').yields(null, {}, validXML);
      done();
    });

    afterEach(function(done) {
      request.post.restore();
      done();
    });

    it('valid', function(done) {
      order.search.post(
        {
          date: '2015-05-03',
        },
        function(err, results) {
          assert.equal(err, null);
          assert.equal(results.orders.num_records, 0);
          done();
        }
      );
    });
  });

  describe('Cancelrebill', function() {
    var validXML =
        '<?xml version="1.0" encoding="UTF-8"?><cancelrebill><response>A</response><responsecode>OP1000</responsecode><responsetext>Rebilling cancelled successfully</responsetext></cancelrebill>',
      validJSON = JSON.parse(
        '{"cancelrebill":{"response":"A","responsecode":"OP1000","responsetext":"Rebilling cancelled successfully"}}'
      );

    beforeEach(function(done) {
      sinon.stub(request, 'post').yields(null, {}, validXML);
      done();
    });

    afterEach(function(done) {
      request.post.restore();
      done();
    });

    it('valid', function(done) {
      order.cancelrebill.post(
        {
          item_id: 15165455544,
        },
        function(err, results) {
          assert.equal(err, null);
          assert.equal(results.cancelrebill.response, 'A');
          assert.equal(results.cancelrebill.responsecode, 'OP1000');
          assert.equal(results.cancelrebill.responsetext, 'Rebilling cancelled successfully');
          done();
        }
      );
    });
  });
});
