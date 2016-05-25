var http = require('http');
var qs = require('qs');
var express = require('express');
var request = require('request');
var requestHandler = require('./helperFunctions.js');
var secrets = require('./config.js');
var postData = {
    url: 'https://prod-api.level-labs.com/api/v2/core/get-all-transactions',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({"args": {"uid": secrets['uid'], "token": secrets['token'], "api-token": secrets["api-token"], "json-strict-mode": false, "json-verbose-response": false}})
};
app = express();
app.use(express.static('app/client'));

app.get('/info', function(req, res){
    request(postData, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            body = JSON.parse(body);
            var transactions = body.transactions;
            res.end(JSON.stringify(requestHandler.aggregateData(transactions)));
        }
    });
});

app.get('/donuts', function(req, res){
    request(postData, function(error, response, body){
        if(error){
            console.log(error);
        } else {
            body = JSON.parse(body);
            var transactions = body.transactions.filter(function(transaction){
                return transaction["merchant"] !== "Krispy Kreme Donuts" && transaction["merchant"] !==  "Dunkin #336784";
            });
            res.end(JSON.stringify(requestHandler.aggregateData(transactions)));
        }
    });
});

app.get('/credit', function(req, res){
    request(postData, function(error, response, body){
        if(error){
            console.log(error);
        } else {
            body = JSON.parse(body);
            var ccDeduction = {};
            var transactions = body.transactions.filter(function(transaction){
                var date = transaction["transaction-time"].split("-").slice(0, 2).join("-");
                if( transaction['merchant'] === 'Credit Card Payment'){
                    if(ccDeduction[date] === undefined){
                        ccDeduction[date] = {payment: 0, charge: 0};
                    }
                    ccDeduction[date].payment += transaction['amount'];
                    return false;
                }
                if( transaction['merchant'] === 'CC Payment'){
                    if(ccDeduction[date] === undefined){
                        ccDeduction[date] = {payment: 0, charge: 0};
                    }
                    ccDeduction[date].charge += Math.abs(transaction['amount']);
                    return false;
                }
                return true;
            });
            var returnData = requestHandler.aggregateData(transactions);

            for(var key in ccDeduction){
                returnData[key].cc = {};
                returnData[key].cc.payment = ccDeduction[key].payment;
                returnData[key].cc.charge = ccDeduction[key].charge;
            }
            res.end(JSON.stringify(returnData));
        }
    });
});
console.log('Server listening on port 1337')
app.listen(1337);