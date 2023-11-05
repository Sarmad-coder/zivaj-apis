const packageController=require('../controllers/packageController')

const router=require('express').Router()

router.get('/getAll',packageController.getpackage)
router.post('/create',packageController.addpackage)


router.get('/get/:id',packageController.getpackageById)
router.put('/update/:id',packageController.updatepackage)
router.delete('/delete/:id',packageController.deletepackage)


module.exports=router

