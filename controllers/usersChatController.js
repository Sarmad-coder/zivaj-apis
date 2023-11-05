const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const UsersChat = db.usersChat;
const User = db.user;
const Package = db.package;

// main work


const keySid = 'SK613297cb1fbd96e18047d4d271a77066';
const accountSid = 'ACd9855b8c7a99f93940afb9be39e77811';
const authToken = '2563e864d19f8dd8856bcfba80d6b303';
const secret = 'pwROEGm7pGVxYm7nu5l3NgeWqxQDoSaK';





// 1.create product
const addusersChat = async (req, res) => {

    try {
        // const now = new Date()
        // const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        // const dateString = now.toLocaleDateString([], { weekday: 'long' });

        // const formattedDate = `${timeString} ${dateString}`;



        let info = {
            fromUserId: req.body.fromUserId,
            toUserId: req.body.toUserId,
            message: req.body.message,
            sendBy: req.body.sendBy,
            // time: formattedDate,
        }


        const nameUserFrom = await User.findOne({
            where: {
                id: info.fromUserId
            }
        })
        const nameUserTo = await User.findOne({
            where: {
                id: info.toUserId
            }
        })
        if (!nameUserFrom) {
            res.status(200).json({
                status: 'fail',
                message: 'From user not found',
            })
        }
        else if (!nameUserTo) {
            res.status(200).json({
                status: 'fail',
                status: 'To user not found',
            })
        } else {

            let mypackage = await Package.findOne({
                where: { id: nameUserFrom?.packageId }
            })

            if (nameUserFrom?.packageId) {

                var referenceDate = new Date();
                var inputDate = new Date(nameUserFrom?.packageDate);
                var timeDiff = referenceDate.getTime() - inputDate.getTime();
                var days = Math.floor(timeDiff / (1000 * 3600 * 24));

                if (days <= mypackage?.duration) {

                    if (nameUserFrom?.message <= 0) {
                        res.status(200).json({
                            status: 'fail',
                            message: 'You have no more messages.'
                        })
                    }
                    else {

                        const message = nameUserFrom?.message - 1


                        let user = await User.update({ ...req.body, message }, {
                            where: { id: info.fromUserId }
                        })

                        const usersChat = await UsersChat.create(info)
                        res.status(200).json({
                            status: 'ok',
                            data: usersChat,
                        })
                    }

                }

                else {

                    const packageId = null
                    const packageDate = null
                    const premium = false

                    let user = await User.update({ ...req.body, packageId, premium, packageDate }, {
                        where: { id: id }
                    })

                    res.status(200).json({
                        status: 'fail',
                        message: 'Your package has been expired.'
                    })
                }

            }
            else {
                return res.status(200).json({
                    status: 'fail',
                    message: 'Your can not chat with the user first buy package'
                })
            }



        }


    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getusersChat = async (req, res) => {

    try {
        let usersChats = await UsersChat.findAll({})
        res.status(200).json({
            status: 'ok',
            data: usersChats
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getusersChatById = async (req, res) => {


    try {
        let toid = req.params.toid
        let fromid = req.params.fromid

        let usersChatA = await UsersChat.findAll({
            where: { toUserId: toid, fromUserId: fromid },

        })
        let usersChatB = await UsersChat.findAll({
            where: { toUserId: fromid, fromUserId: toid },

        })

        // Merge the arrays based on date
        const mergedArray = [...usersChatA, ...usersChatB]

        const newarray=mergedArray.sort((a, b) => a.createdAt - b.createdAt)

        res.status(200).json({
            status: 'ok',
            data: newarray
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updateusersChat = async (req, res) => {

    try {
        let id = req.params.id


        let getusersChat = await UsersChat.findOne({
            where: { id: id }
        })

        const usersChat = await UsersChat.update({ ...req.body }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: usersChat
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deleteusersChat = async (req, res) => {

    try {
        let id = req.params.id

        const usersChat = await UsersChat.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: usersChat
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addusersChat,
    getusersChat,
    getusersChatById,
    updateusersChat,
    deleteusersChat,
}

