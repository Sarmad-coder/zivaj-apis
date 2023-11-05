const adminUsersChatController=require('../controllers/adminUsersChatController')

const router=require('express').Router()

router.get('/get',adminUsersChatController.getadminUsersChat)
router.post('/create',adminUsersChatController.addadminUsersChat)


router.get('/get/:id',adminUsersChatController.getadminUsersChatById)
router.put('/update/:id',adminUsersChatController.updateadminUsersChat)
router.delete('/delete/:id',adminUsersChatController.deleteadminUsersChat)


module.exports=router

