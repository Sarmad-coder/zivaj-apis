const db = require('../models');
const { compareSync } = require('bcrypt')
const { sign }=require('jsonwebtoken')
const dbConfig = require('../config/dbConfig.js')

const User = db.user;
const Staff = db.staff;

const getUser = async (req, res) => {
    try {
        let info = {
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
        }



        const checkuser = await User.findOne({
            where: {
                email: info.email,
                phoneNumber: info.phoneNumber
            }
        });



        if(checkuser) {

            res.status(200).json({
                status: 'ok',
                message: "Successfully logged in",
                data: checkuser
            })

        }
        else{
            res.status(200).json({
                status: 'register',
            })
        }


    }
    catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



const getStaff = async (req, res) => {
    try {
        let info = {
            email: req.body.email,
            password: req.body.password,
        }



        const checksatffMail = await Staff.findOne({
            where: {
                email: info.email,
            }
        });
        const checksatffPass = await Staff.findOne({
            where: {
                password: info.password,
            }
        });



        if(checksatffMail) {

            if(checksatffPass){
                res.status(200).json({
                    status: 'ok',
                    message: "Successfully logged in",
                    data: checksatffPass
                })
            }
            else{
                
                res.status(200).json({
                    status: 'Password not match',
                })
            }


        }
        else{
        }


    }
    catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}




const getUserGoogle = async (req, res) => {
    try {
        let info = {
            email: req.body.email,
        }



        const checkuser = await User.findOne({
            where: {
                email: info.email,
            }
        });



        if(checkuser) {

            res.status(200).json({
                status: 'ok',
                message: "Successfully logged in",
                data: checkuser
            })

        }
        else{

            res.status(200).json({
                status: 'register',
            })
        }


    }
    catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



module.exports = {
    getUser,
    getUserGoogle,
    getStaff,
}