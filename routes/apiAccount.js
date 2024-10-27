const express = require("express");
const { userAuth } = require("../middleware/userAuth");
const { Account } = require("../db/db");
const router = express.Router();

router.get('/balance', userAuth, async (req,res) => {
    const userId = req.userId;
    let usersBalance;
    try {
        usersBalance = await Account.findOne({userId: userId});
        if(!usersBalance){
            return res.status("411").json({
                "msg": "No balance"
            });
        }

    } catch(e){
        console.error(e);
        return res.status("411").json({
            "msg": "Something went wrong"
        });
    }
    
    res.status(200).json({
        "balance": usersBalance.balance
    });

});

router.post('/transfer', userAuth, async (req,res) => {
    const userId = req.userId;
    const sendTo = req.body.sendTo;
    const amount = req.body.amount;

    let remainingBalance = await Account.findOne({userId: userId});
    if(!remainingBalance){
        return res.status(411).json({
            "msg": "No balance"
        });
    }

    let receiverBalance = await Account.findOne({userId: sendTo});
    if(!receiverBalance){
        return res.status(411).json({
            "msg": "Receiver's bank not responsive"
        });
    }
    //Proceed with the transaction only if remaining balance is greater than the amount
    remainingBalance = remainingBalance.balance;
    receiverBalance = receiverBalance.balance;
    console.log("remainingBalance", remainingBalance);
    console.log("receiverBalance", receiverBalance);

    if(remainingBalance >= amount ){
        //Debit balance from thr first account then credit to another
        const updatedBalance = Number(remainingBalance)-Number(amount);
        const updateSender = await Account.findOneAndUpdate({userId}, {balance: updatedBalance});

        const updateReceiver = await Account.findOneAndUpdate({userId: sendTo}, {balance: Number(receiverBalance)+Number(amount) });

        console.log(updateSender);
        console.log(updateReceiver);
    } else {
        return res.status(411).json({
            "msg": "Insuffiecient balance"
        });
    }

    res.status(200).json({
        "msg": "Transfer successful"
    });

})

module.exports = router;