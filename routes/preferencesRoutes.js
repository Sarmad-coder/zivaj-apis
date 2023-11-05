const preferencesController=require('../controllers/preferencesController')

const router=require('express').Router()

router.get('/getSingle/:prefid/:useid',preferencesController.getpreferences)
router.get('/getAll/:id',preferencesController.getAllpreferences)
router.post('/create',preferencesController.addpreferences)


router.get('/get/:id',preferencesController.getpreferencesById)
router.put('/update/:id',preferencesController.updatepreferences)
router.delete('/delete/:id',preferencesController.deletepreferences)


module.exports=router

