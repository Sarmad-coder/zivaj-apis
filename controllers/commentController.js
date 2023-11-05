const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const Comment = db.comment;
const User = db.user;
const Reel = db.reel;
// main work




// 1.create reel
const addcomment = async (req, res) => {

    try {

        let info = {
            message: req.body.message,
            userId: req.body.userId,
            reelId: req.body.reelId,
        }



           const comment= await Comment.create(info)
           res.status(200).json({
            status: 'ok',
            data: comment,
        })



    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all reels
const getcomment = async (req, res) => {

    try {
        let comments = await Comment.findAll({
            include: [
                {
                    model: User,
                    as: 'user'
                },
                {
                    model: Reel,
                    as: 'reel'
                },
            ],
        })
        res.status(200).json({
            status: 'ok',
            data: comments
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



const getSingleUsercomment = async (req, res) => {

    try {
        
        let id = req.params.id
        
        let comments = await Comment.findAll({
            include: [
                {
                    model: User,
                    as: 'user'
                },
                {
                    model: Reel,
                    as: 'reel'
                },
            ],
            where: { reelId: id }
        })
        res.status(200).json({
            status: 'ok',
            data: comments
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get reel by id
const getcommentById = async (req, res) => {


    try {
        let id = req.params.id

        let comment = await Comment.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: comment
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update reel

const updatecomment = async (req, res) => {

    try {
        let id = req.params.id


        let getcomment = await Comment.findOne({
            where: { id: id }
        })

        const comment = await Comment.update({ ...req.body }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: comment
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete reel

const deletecomment = async (req, res) => {

    try {
        let id = req.params.id

        const comment = await Comment.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: comment
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addcomment,
    getcomment,
    getcommentById,
    updatecomment,
    deletecomment,
    getSingleUsercomment,
}

