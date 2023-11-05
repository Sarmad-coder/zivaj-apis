const { checkToken } = require('../auth/token_validation')
const loginController=require('../controllers/loginController')

const router=require('express').Router()

router.post('/create',loginController.getUser)
router.post('/staff',loginController.getStaff)
router.post('/googleCreate',loginController.getUserGoogle)


module.exports=router

