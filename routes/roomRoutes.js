const { checkToken } = require('../auth/token_validation')
const roomController=require('../controllers/twillioController')

const router=require('express').Router()

router.get('/create/:identity',roomController.addtwillio)
router.get('/join/:identity/:room/:token',roomController.jointwillio)


module.exports=router

