const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const StripeKey = db.stripeKey;
const User = db.user;
const Reel = db.reel;
// main work




// 1.create reel
const addstripeKey = async (req, res) => {

    try {

        let info = {
            publishKey: req.body.publishKey,
            secretKey: req.body.secretKey,
        }



           const stripeKey= await StripeKey.create(info)
           res.status(200).json({
            status: 'ok',
            data: stripeKey,
        })



    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all reels
const getstripeKey = async (req, res) => {

    try {
        let stripeKeys = await StripeKey.findAll({
        })
        res.status(200).json({
            status: 'ok',
            data: stripeKeys
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 3.get reel by id
const getstripeKeyById = async (req, res) => {


    try {
        let id = req.params.id

        let stripeKey = await StripeKey.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: stripeKey
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update reel

const updatestripeKey = async (req, res) => {

    try {
        let id = req.params.id


        let getstripeKey = await StripeKey.findOne({
            where: { id: 1 }
        })
        if(getstripeKey){
            const stripeKey = await StripeKey.update({ ...req.body }, {
                where: { id: 1 }
            }
            )
            res.status(200).json({
                status: 'ok',
                data: stripeKey
            })
        }
        else{
            let info = {
                publishKey: req.body.publishKey,
                secretKey: req.body.secretKey,
            }
    
    
    
               const stripeKey= await StripeKey.create(info)
               res.status(200).json({
                status: 'ok',
                data: stripeKey,
            })
        }

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete reel

const deletestripeKey = async (req, res) => {

    try {
        let id = req.params.id

        const stripeKey = await StripeKey.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: stripeKey
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addstripeKey,
    getstripeKey,
    getstripeKeyById,
    updatestripeKey,
    deletestripeKey,
}

