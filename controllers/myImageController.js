const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const MyImage = db.myImage;

// main work




// 1.create product
const addmyImage = async (req, res) => {

    try {

        if(req.files===undefined){
            res.status(200).json({
                status: 'fail',
                message: 'Must add image',
            })    

        }
        else{

        let info = {
            image: req.files === undefined ? '' : req.files.map((file) => dbConfig.mainUrl + file.filename),
        }



           const myImage= await MyImage.create(info)
           res.status(200).json({
            status: 'ok',
            data: myImage,
        })


    }
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getmyImage = async (req, res) => {

    try {
        let myImages = await MyImage.findAll({})
        res.status(200).json({
            status: 'ok',
            data: myImages
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getmyImageById = async (req, res) => {


    try {
        let id = req.params.id

        let myImage = await MyImage.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: myImage
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updatemyImage = async (req, res) => {

    try {
        let id = req.params.id


        let getmyImage = await MyImage.findOne({
            where: { id: id }
        })

        const image = req.files[0] === undefined ? getmyImage.dataValues.image : req.files.map((file) => dbConfig.mainUrl + file.filename)
        

        const myImage = await MyImage.update({ ...req.body,image }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: myImage
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deletemyImage = async (req, res) => {

    try {
        let id = req.params.id

        const myImage = await MyImage.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: myImage
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addmyImage,
    getmyImage,
    getmyImageById,
    updatemyImage,
    deletemyImage,
}

