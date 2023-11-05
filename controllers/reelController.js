const db = require('../models');
const dbConfig = require('../config/dbConfig.js');



// create main model
const Reel = db.reel;
const User = db.user;
const Like = db.like;

// main work




// 1.create product
const addreel = async (req, res) => {

    try {

        if(req.files===undefined){
            res.status(200).json({
                status: 'fail',
                message: 'Must add image',
            })    

        }
        else{


            

        let info = {
            about: req.body.about,
            userId: req.body.userId,
            image: dbConfig.mainUrl + req.files[0].filename,
        }



           const reel= await Reel.create(info)
           res.status(200).json({
            status: 'ok',
            data: reel,
        })


    }
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getreel = async (req, res) => {

    try {
        let reels = await Reel.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    
                },
                {
                    model: Like,
                    as: 'like',

                },
            ],
        })
        res.status(200).json({
            status: 'ok',
            data: reels
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getreelById = async (req, res) => {


    try {
        let id = req.params.id

        let reel = await Reel.findAll({
            where: { userId: id }
        })
        res.status(200).json({
            status: 'ok',
            data: reel
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getsinglereelById = async (req, res) => {


    try {
        let id = req.params.id

        let reel = await Reel.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: reel
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updatereel = async (req, res) => {

    try {
        let id = req.params.id


        let getreel = await Reel.findOne({
            where: { id: id }
        })

        const image = req.files[0] === undefined ? getreel.dataValues.image : dbConfig.mainUrl + req.files[0].filename
        

        const reel = await Reel.update({ ...req.body,image }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: reel
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deletereel = async (req, res) => {

    try {
        let id = req.params.id

        const reel = await Reel.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: reel
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addreel,
    getreel,
    getreelById,
    getsinglereelById,
    updatereel,
    deletereel,
}

