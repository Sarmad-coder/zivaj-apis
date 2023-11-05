const myImageController=require('../controllers/myImageController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',myImageController.getmyImage)
router.post('/create',upload.any('image'),myImageController.addmyImage)


router.get('/get/:id',myImageController.getmyImageById)
router.put('/update/:id',upload.any('image'),myImageController.updatemyImage)
router.delete('/delete/:id',myImageController.deletemyImage)


module.exports=router

