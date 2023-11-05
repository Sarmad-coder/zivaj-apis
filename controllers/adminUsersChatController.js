const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const AdminUsersChat = db.adminUsersChat;
const User = db.user;
const Staff = db.staff;

// main work




// 1.create product
const addadminUsersChat = async (req, res) => {

    try {
        const now =new Date()
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dateString = now.toLocaleDateString([], { weekday: 'long' });

        const formattedDate = `${timeString} ${dateString}`;
        
        

        let info = {
            userId: req.body.userId,
            staffId: 1,
            message: req.body.message,
            sendBy: req.body.sendBy,
            // createdAt:formattedDate,
        }


        const nameprofile = await Staff.findOne({
            where: {
                id: 1
            }
        })
        const nameUser = await User.findOne({
            where: {
                id: info.userId
            }
        })
        if (!nameprofile) {
            res.status(200).json({
                status: 'fail',
                message: 'Admin not exists',
            })
        }
        else if (!nameUser) {
            res.status(200).json({
                status: 'fail',
                status: 'Users not exists',
            })
        } else {

           const adminUsersChat= await AdminUsersChat.create(info)
           res.status(200).json({
            status: 'ok',
            data: adminUsersChat,
            date:formattedDate
        })

        }


    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getadminUsersChat = async (req, res) => {

    try {
        let adminUsersChats = await AdminUsersChat.findAll({
            include: [
                {
                  model: User,
                  as: 'user',
                 }
            ]
        })
        res.status(200).json({
            status: 'ok',
            data: adminUsersChats
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getadminUsersChatById = async (req, res) => {


    try {
        let id = req.params.id

        let adminUsersChat = await AdminUsersChat.findAll({
            include: [
                {
                  model: User,
                  as: 'user',
                 }
            ],
            where: { userId: id }
        })
        res.status(200).json({
            status: 'ok',
            data: adminUsersChat
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updateadminUsersChat = async (req, res) => {

    try {
        let id = req.params.id


        let getadminUsersChat = await AdminUsersChat.findOne({
            where: { id: id }
        })

        const adminUsersChat = await AdminUsersChat.update({ ...req.body }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: adminUsersChat
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deleteadminUsersChat = async (req, res) => {

    try {
        let id = req.params.id

        const adminUsersChat = await AdminUsersChat.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: adminUsersChat
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addadminUsersChat,
    getadminUsersChat,
    getadminUsersChatById,
    updateadminUsersChat,
    deleteadminUsersChat,
}

