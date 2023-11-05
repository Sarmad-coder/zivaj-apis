const ratingController=require('../controllers/ratingController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',ratingController.getrating)
router.post('/create',ratingController.addrating)


router.get('/get/:id',ratingController.getratingById)
router.put('/update/:id',ratingController.updaterating)
router.delete('/delete/:id',ratingController.deleterating)


module.exports=router

