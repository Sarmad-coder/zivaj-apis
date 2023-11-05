const stripeKeyController=require('../controllers/stripeKeyController')

const router=require('express').Router()

router.get('/getAll',stripeKeyController.getstripeKey)
router.post('/create',stripeKeyController.addstripeKey)


router.get('/get/:id',stripeKeyController.getstripeKeyById)
router.put('/update/:id',stripeKeyController.updatestripeKey)
router.delete('/delete/:id',stripeKeyController.deletestripeKey)


module.exports=router

