const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const Transaction = db.transaction;
const User = db.user;
const Reel = db.reel;
// main work




// 1.create reel
const addtransaction = async (req, res) => {

    try {

        let info = {
            amount: req.body.amount,
            userId: req.body.userId,
        }



           const transaction= await Transaction.create(info)
           res.status(200).json({
            status: 'ok',
            data: transaction,
        })



    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all reels
const gettransaction = async (req, res) => {

    try {
        let transactions = await Transaction.findAll({
            include: [
                {
                    model: User,
                    as: 'user'
                },
            ],
        })
        res.status(200).json({
            status: 'ok',
            data: transactions
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



const getSingleUsertransaction = async (req, res) => {

    try {
        
        let id = req.params.id
        
        let transactions = await Transaction.findAll({
            include: [
                {
                    model: User,
                    as: 'user'
                },
            ],
            where: { userId: id }
        })
        res.status(200).json({
            status: 'ok',
            data: transactions
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get reel by id
const gettransactionById = async (req, res) => {


    try {
        let id = req.params.id

        let transaction = await Transaction.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: transaction
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update reel

const updatetransaction = async (req, res) => {

    try {
        let id = req.params.id


        let gettransaction = await Transaction.findOne({
            where: { id: id }
        })

        const transaction = await Transaction.update({ ...req.body }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: transaction
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete reel

const deletetransaction = async (req, res) => {

    try {
        let id = req.params.id

        const transaction = await Transaction.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: transaction
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addtransaction,
    gettransaction,
    gettransactionById,
    updatetransaction,
    deletetransaction,
    getSingleUsertransaction,
}

