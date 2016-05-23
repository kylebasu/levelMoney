var http = require('http');
var qs = require('qs');
var express = require('express');
var request = require('request');

app = express();
app.use(express.static('app/client'));

app.get('/info', function(req, res){
    request({
        url: 'https://prod-api.level-labs.com/api/v2/core/get-all-transactions', 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({"args": {"uid": 1110590645, "token": "F00C9279BC9F7B499CB2FFFFB7F8B582", "api-token": "AppTokenForInterview", "json-strict-mode": false, "json-verbose-response": false}}) //Set the body as a string
    }, 
    function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            var totalSpent = 0
            var totalIncome = 0
            body = JSON.parse(body);
            var transactions = body.transactions;
            var returnData = {};
            transactions.forEach(function(transaction){
                var date = transaction["transaction-time"].split("-").slice(0, 2).join("-");
                if(!returnData[date]){
                    if(transaction.amount < 0){
                        returnData[date] = {"date": date, "spent": Math.abs(transaction.amount), "income": 0}
                        totalSpent += Math.abs(transaction.amount);
                    }else{
                        returnData[date] = {"date": date, "spent":0, "income": transaction.amount}
                        totalIncome += transaction.amount;
                    }
                }else{
                    if(transaction.amount < 0){
                        returnData[date]["spent"] += Math.abs(transaction.amount);
                        totalSpent += Math.abs(transaction.amount);
                    }else{
                        returnData[date]["income"] +=transaction.amount;
                        totalIncome += transaction.amount;
                    }
                }
            });
            var avgSpent = Math.round(totalSpent/Object.keys(returnData).length);
            var avgIncome = Math.round(totalIncome/Object.keys(returnData).length);
            returnData["average"] = {"date": "average", "spent": avgSpent, "income": avgIncome};
            res.end(JSON.stringify(returnData));
        }
    });
});

app.listen(1337);