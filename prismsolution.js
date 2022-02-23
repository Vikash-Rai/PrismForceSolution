const fs = require('fs');
fs.readFile("./1-input.json", "utf8", (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err);
        return;
    }
    try {

        const customer = JSON.parse(jsonString);
        //console.log(customer.expenseData)
        var el = customer.expenseData.length;
        var rl = customer.revenueData.length;
        var data = {};
        data.balance = [];
        for (var i = 0; i < el; i++) {
            var res = 0;

            //console.log(customer.expenseData[i].startDate)
            //iterating over revenueData to perform our arithmetic operation on matching startDate

            for (var j = 0; j < rl; j++) {
                if (customer.expenseData[i].startDate == customer.revenueData[j].startDate) {
                    //console.log(item.amount)
                    res = res + customer.revenueData[j].amount;
                }
            }
            var obj = {
                amount: res - customer.expenseData[i].amount,
                startDate: customer.expenseData[i].startDate,
            }
            data.balance.push(obj)


        }

        for (var j = 0; j < rl; j++) {
            var indicator = 0;
            for (var i = 0; i < el; i++) {
                if (customer.revenueData[j].startDate == customer.expenseData[i].startDate) {
                    indicator = 1;
                    break;
                }
            }
            if (indicator != 1) {
                var obj = {
                    amount: customer.revenueData[j].amount,
                    startDate: customer.revenueData[j].startDate
                }
                data.balance.push(obj)

            }
        }
        fs.writeFile("balance1.json", JSON.stringify(data), function (err) {
            if (err) throw err;
            //  console.log('complete');
        }
        );
    } catch (err) {
        console.log("Error parsing JSON string:", err);
    }

});

//--------------------console Output--------------------------------------------------------------------------

function getOutput() {
    fs.readFile("balance1.json", "utf8", (err, jsonStrings) => {
        try {
            const myBalance = JSON.parse(jsonStrings)
            //  const sortedBalance = myBalance.balance;
            console.log(myBalance.balance.sort(function (a, b) {
                return new Date(a.startDate).valueOf() - new Date(b.startDate).valueOf()
            }
            ))
        }
        catch (err) {
            console.log("Error parsing JSON string:", err);
        }
    })
}
setTimeout(getOutput, 1000)