const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const Like = db.like;
const Reel = db.reel;

// main work




// 1.create product
const addlike = async (req, res) => {

    try {

        let info = {
            like: true,
            userId: req.body.userId,
            reelId: req.body.reelId,
        }


        let getlike = await Like.findOne({
            where: { reelId: info.reelId, userId: info.userId }
        })


        // const check = getlike.like

        const getUserFollow = await Reel.findOne({
            where: { id: info.reelId }
        })



        if (getUserFollow.myLike.includes(info?.userId)) {
            const myFollow = getUserFollow?.myLike.filter(i => i !== (info?.userId))
            const newUserFollow = await Reel.update({ myLike: myFollow }, {
                where: { id: info.reelId }
            })

            res.status(200).json({
                status: 'ok',
                data: newUserFollow,
                message: 'You unlike the reel.'
            })
        }
        else {


            const newUserFollow = await Reel.update({ myLike: [...getUserFollow?.myLike, info?.userId] }, {
                where: { id: info.reelId }
            })


            if (getUserFollow.myDislike.includes(info?.userId)) {
                const myFollow = getUserFollow?.myDislike.filter(i => i !== (info?.userId))
                const newUserFollow = await Reel.update({ myDislike: myFollow }, {
                    where: { id: info.reelId }
                })

            }

            res.status(200).json({
                status: 'ok',
                data: newUserFollow,
                message: 'You like the reel.'
            })


        }




        // if (getlike) {

        //     if (getlike.like === false) {
        //         const like = true
        //         const mylike = await Like.update({ ...req.body, like }, {
        //             where: { reelId: info.reelId, userId: info.userId }
        //         }
        //         )
        //         res.status(200).json({
        //             status: 'ok',
        //             data: mylike,
        //             message: 'You like the reel.'
        //         })

        //     }
        //     else if (getlike.like === true) {

        //         const like = false
        //         const mylike = await Like.update({ ...req.body, like }, {
        //             where: { reelId: info.reelId, userId: info.userId }
        //         }
        //         )
                
        //     }
        // }
        // else {


        //     const like = await Like.create(info)
            
        // }








    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 1.create product
const adddislike = async (req, res) => {

    try {

        let info = {
            userId: req.body.userId,
            reelId: req.body.reelId,
        }





        const getUserFollow = await Reel.findOne({
            where: { id: info.reelId }
        })


        if (getUserFollow.myDislike.includes(info?.userId)) {
            const myFollow = getUserFollow?.myDislike.filter(i => i !== (info?.userId))
            const newUserFollow = await Reel.update({ myDislike: myFollow }, {
                where: { id: info.reelId }
            })
            res.status(200).json({
                status: 'ok',
                data: newUserFollow,
                message: 'You remove reel from dislike.'
            })

        }
        else {
            const newUserFollow = await Reel.update({ myDislike: [...getUserFollow?.myDislike, info?.userId] }, {
                where: { id: info.reelId }

            })


            if (getUserFollow.myLike.includes(info?.userId)) {
                const myFollow = getUserFollow?.myLike.filter(i => i !== (info?.userId))
                const newUserFollow = await Reel.update({ myLike: myFollow }, {
                    where: { id: info.reelId }
                })
            }

            res.status(200).json({
                status: 'ok',
                data: newUserFollow,
                message: 'You dislike the reel.'
            })

        }







    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getlike = async (req, res) => {


    try {
        let likes = await Like.findAll({
            where: { userId: req.params.id }
        })
        res.status(200).json({
            status: 'ok',
            data: likes
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getlikeById = async (req, res) => {


    try {
        let id = req.params.id

        let like = await Like.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: like
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updatelike = async (req, res) => {

    try {
        let id = req.params.id


        let getlike = await Like.findOne({
            where: { id: id }
        })

        const like = await Like.update({ ...req.body }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: like
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deletelike = async (req, res) => {

    try {
        let id = req.params.id

        const like = await Like.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: like
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addlike,
    getlike,
    getlikeById,
    updatelike,
    deletelike,
    adddislike
}

