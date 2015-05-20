'use strict';

var Client = require('./../lib/index');

var x = new Client({
    'client_id': 744364,
    'api_key': 'e9EwUJmVbOxydxTX0vIv',
    'baseUrl': 'http://proxy.aws/service'
});

var orderAPI = x.order();

orderAPI.search.post({
    date: '2015-05-04'
}, function (err, results) {
    if (err) {
        console.log('err', err.name, err.message);
    }
    console.log(JSON.stringify(results));
});

