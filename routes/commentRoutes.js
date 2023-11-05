const commentController=require('../controllers/commentController')

const router=require('express').Router()

router.get('/get',commentController.getcomment)
router.get('/getSingleUser/:id',commentController.getSingleUsercomment)
router.post('/create',commentController.addcomment)


router.get('/get/:id',commentController.getcommentById)
router.put('/update/:id',commentController.updatecomment)
router.delete('/delete/:id',commentController.deletecomment)


module.exports=router

