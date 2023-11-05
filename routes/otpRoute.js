
const otpController=require('../controllers/otpController')

const router=require('express').Router()

router.post('/sendOTP',otpController.sendOTP)
// router.post('/staff',loginController.getStaff)
// router.post('/googleCreate',loginController.getUserGoogle)


module.exports=router

