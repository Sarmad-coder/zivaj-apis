const usersChatController=require('../controllers/usersChatController')

const router=require('express').Router()

router.get('/getAll',usersChatController.getusersChat)
router.post('/create',usersChatController.addusersChat)


router.get('/get/:toid/:fromid',usersChatController.getusersChatById)
router.put('/update/:id',usersChatController.updateusersChat)
router.delete('/delete/:id',usersChatController.deleteusersChat)


module.exports=router

