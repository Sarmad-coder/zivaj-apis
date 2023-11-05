const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const Rating = db.rating;
const User = db.user;
// main work




// 1.create reel
const addrating = async (req, res) => {

    try {

        let info = {
            review: req.body.review,
            userId: req.body.userId,
            rating: req.body.rating,
        }



           const rating= await Rating.create(info)
           res.status(200).json({
            status: 'ok',
            data: rating,
        })



    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all reels
const getrating = async (req, res) => {

    try {
        let ratings = await Rating.findAll({
        })
        res.status(200).json({
            status: 'ok',
            data: ratings
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}




// 3.get reel by id
const getratingById = async (req, res) => {


    try {
        let id = req.params.id

        let rating = await Rating.findOne({
            where: { userId: id }
        })
        res.status(200).json({
            status: 'ok',
            data: rating
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update reel

const updaterating = async (req, res) => {

    try {
        let id = req.params.id


        let getrating = await Rating.findOne({
            where: { userId: id }
        })

        if(getrating){
            const rating = await Rating.update({ ...req.body }, {
                where: { userId: id }
            }
            )
            res.status(200).json({
                status: 'ok',
                data: rating
            })
        }
        else{

            let info = {
                review: req.body.review,
                userId: req.body.userId,
                rating: req.body.rating,
            }
    
    
    
               const rating= await Rating.create(info)
               res.status(200).json({
                status: 'ok',
                data: rating,
            })

        }

        
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete reel

const deleterating = async (req, res) => {

    try {
        let id = req.params.id

        const rating = await Rating.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: rating
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addrating,
    getrating,
    getratingById,
    updaterating,
    deleterating,
}

