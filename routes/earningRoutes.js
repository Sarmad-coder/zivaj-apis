const earningController=require('../controllers/earningController')

const router=require('express').Router()

router.get('/getAll',earningController.getearning)
router.get('/today',earningController.getTodayearning)
router.get('/week',earningController.getWeeklyearning)
router.get('/month',earningController.getMonthlyearning)
router.get('/months',earningController.getMonthlyEarnings)
router.get('/year',earningController.getYearlyearning)
router.post('/create',earningController.addearning)


router.get('/get/:id',earningController.getearningById)
router.put('/update/:id',earningController.updateearning)
router.delete('/delete/:id',earningController.deleteearning)


module.exports=router

