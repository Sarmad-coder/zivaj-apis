const transactionController=require('../controllers/transactionController')

const router=require('express').Router()

router.get('/getAll',transactionController.gettransaction)
router.post('/create',transactionController.addtransaction)


router.get('/get/:id',transactionController.gettransactionById)
router.put('/update/:id',transactionController.updatetransaction)
router.delete('/delete/:id',transactionController.deletetransaction)


module.exports=router

