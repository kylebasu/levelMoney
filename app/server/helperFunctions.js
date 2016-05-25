function aggregateData(transactions){
    var returnData = {};
    var totalSpent = 0;
    var totalIncome = 0;
    transactions.forEach(function(transaction){
        var date = transaction["transaction-time"].split("-").slice(0, 2).join("-");
        if(!returnData[date]){
            if(transaction.amount < 0){
                returnData[date] = {"date": date, "spent": Math.abs(transaction.amount), "income": 0};
                totalSpent += Math.abs(transaction.amount);
            }else{
                returnData[date] = {"date": date, "spent":0, "income": transaction.amount};
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
    return returnData;
}

exports.aggregateData = aggregateData;