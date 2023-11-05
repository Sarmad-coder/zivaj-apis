const express = require('express')
const cors=require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const {socket} = require('./controllers/socketController.js');
var http=require('http')

const app=express()



// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


// Set the maximum payload size limit (e.g., 10MB)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


var server=http.createServer(app)

const {Server}=require('socket.io')
const io=new Server(server,{cors:{origin:'*'}})
socket(io)





// routers
const userRouter = require('./routes/userRoutes.js')
const loginRouter = require('./routes/loginRoutes.js')
const usersChatRouter = require('./routes/usersChatRoutes.js')
const preferencesRouter = require('./routes/preferencesRoutes.js')
const followRouter = require('./routes/followRoutes.js')
const likeRouter = require('./routes/likeRoutes.js')
const reelRouter = require('./routes/reelRoutes.js')
const staffRouter = require('./routes/staffRoutes.js')
const commentRouter = require('./routes/commentRoutes.js')
const packageRouter = require('./routes/packageRoutes.js')
const earningRouter = require('./routes/earningRoutes.js')
const myImageRouter = require('./routes/myImageRoutes.js')
const ratingRouter = require('./routes/ratingRoutes.js')
const adminUsersChatRouter = require('./routes/adminUsersChatRoutes.js')
const roomRouter = require('./routes/roomRoutes.js');
const otpRouter = require('./routes/otpRoute.js');
const transactionRouter = require('./routes/transactionRoutes.js')
const stripeKeyRouter = require('./routes/stripeKeyRoutes.js')


app.use('/zivaj/otp',otpRouter)
app.use('/zivaj/users',userRouter)
app.use('/zivaj/login',loginRouter)
app.use('/zivaj/chat',usersChatRouter)
app.use('/zivaj/preferences',preferencesRouter)
app.use('/zivaj/follow',followRouter)
app.use('/zivaj/like',likeRouter)
app.use('/zivaj/reel',reelRouter)
app.use('/zivaj/staff',staffRouter)
app.use('/zivaj/package',packageRouter)
app.use('/zivaj/comment',commentRouter)
app.use('/zivaj/earning',earningRouter)
app.use('/zivaj/myImage',myImageRouter)
app.use('/zivaj/rating',ratingRouter)
app.use('/zivaj/room',roomRouter)
app.use('/zivaj/transaction',transactionRouter)
app.use('/zivaj/adminUsersChat',adminUsersChatRouter)
app.use('/zivaj/stripeKey',stripeKeyRouter)



app.use(express.static(__dirname + '/Images'))




// testing
app.get('/',(req,res)=>{
    res.json({ message:'Success'})
})


const PORT=process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})