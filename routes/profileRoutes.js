const profileController=require('../controllers/profileController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.post('/login',profileController.getprofile)
router.post('/create',upload.any('image'),profileController.addprofile)


router.get('/get/:id',profileController.getprofileById)
router.put('/update/:id',upload.any('image'),profileController.updateprofile)
router.delete('/delete/:id',profileController.deleteprofile)


module.exports=router

