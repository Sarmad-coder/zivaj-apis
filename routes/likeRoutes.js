const likeController=require('../controllers/likeController')

const router=require('express').Router()

router.get('/getAll/:id',likeController.getlike)
router.post('/create',likeController.addlike)
router.put('/dislike',likeController.adddislike)


router.get('/get/:id',likeController.getlikeById)
router.put('/update/:id',likeController.updatelike)
router.delete('/delete/:id',likeController.deletelike)


module.exports=router

