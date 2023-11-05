const reelController=require('../controllers/reelController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',reelController.getreel)
router.post('/create',upload.any('image'),reelController.addreel)


router.get('/get/:id',reelController.getreelById)
router.get('/getS/:id',reelController.getsinglereelById)
router.put('/update/:id',upload.any('image'),reelController.updatereel)
router.delete('/delete/:id',reelController.deletereel)


module.exports=router

