const { checkToken } = require('../auth/token_validation')
const userController=require('../controllers/userController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/getAll/:id',userController.getUsers)
router.get('/getAll',userController.allUsers)
router.get('/noUseApp',userController.NoUseappByUsers)
router.post('/create',upload.any('selfie','image1','image2','image3','image4','image5','image6','image7'),userController.addUsers)


router.get('/get/:id',userController.getUserById)
router.get('/my/:id',userController.getSingUserById)
router.put('/update/:id',upload.fields([
    {name:'selfie',maxCount:1},
    {name:'image1',maxCount:1},
    {name:'image2',maxCount:1},
    {name:'image3',maxCount:1},
    {name:'image4',maxCount:1},
    {name:'image5',maxCount:1},
    {name:'image6',maxCount:1},
    {name:'image7',maxCount:1},
]),userController.updateUser)
router.put('/package/:id',userController.getPackage)
router.put('/toggle/:id',userController.toggleUser)
router.put('/notUseApp/:id',userController.NotuseappUser)
router.delete('/delete/:id',userController.deleteUser)


module.exports=router

