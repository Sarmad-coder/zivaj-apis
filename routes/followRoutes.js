const followController=require('../controllers/followController')

const router=require('express').Router()

router.get('/getAll',followController.getfollow)
router.post('/create',followController.addfollow)


router.get('/get/:id',followController.getfollowById)
router.get('/match',followController.getmatchfollowById)
router.get('/getFollow/:id',followController.getLikefollowById)
router.get('/likeYou/:id',followController.getfollowUserById)
router.put('/update/:id',followController.updatefollow)
router.delete('/delete/:id',followController.deletefollow)


module.exports=router

