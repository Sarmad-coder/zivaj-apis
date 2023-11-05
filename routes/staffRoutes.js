const staffController=require('../controllers/staffController')

const router=require('express').Router()

router.get('/getAll',staffController.getstaff)
router.post('/create',staffController.addstaff)


router.get('/get/:id',staffController.getstaffById)
router.put('/update/:id',staffController.updatestaff)
router.delete('/delete/:id',staffController.deletestaff)


module.exports=router

