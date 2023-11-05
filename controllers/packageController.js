const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const Package = db.package;


// 1.create product
const addpackage = async (req, res) => {

    try {
        let info = {
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            numberOfUser: req.body.numberOfUser,
            message: req.body.message,
            duration: req.body.duration,
            description: req.body.description,
            calls: req.body.calls,
        }


        const package = await Package.create(info)
        res.status(200).json({
            status: 'ok',
            data: package,

        })



    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getpackage = async (req, res) => {

    try {
        let packages = await Package.findAll({})
        res.status(200).json({
            status: 'ok',
            data: packages
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getpackageById = async (req, res) => {


    try {
        let id = req.params.id

        let package = await Package.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: package
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updatepackage = async (req, res) => {

    try {
        let id = req.params.id


        let getpackage = await Package.findOne({
            where: { id: id }
        })

        const package = await Package.update({ ...req.body }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: package
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deletepackage = async (req, res) => {

    try {
        let id = req.params.id

        const package = await Package.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: package
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addpackage,
    getpackage,
    getpackageById,
    updatepackage,
    deletepackage,
}

