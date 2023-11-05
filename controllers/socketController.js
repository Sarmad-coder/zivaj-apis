const twilio = require('twilio');
const jwt = require('jsonwebtoken');



const keySid = 'SK613297cb1fbd96e18047d4d271a77066';
const accountSid = 'ACbb6d2eee8eeb610710b1501d10d32d2f';
const authToken = '888f476669a3ed53ac2f185c4951a3be';
const secret = 'pwROEGm7pGVxYm7nu5l3NgeWqxQDoSaK';
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;


const client = require('twilio')(accountSid, authToken);





function socket(io){

    
    const userSide=io.of('/room')
    console.log(userSide)




    userSide.on("connection", (socket) => {
        console.log("userside socket connected");

        socket.on("createRoom", async (data, cb) => {
          
          
          
          
            try {
                let info = {
                    room: data.room,
                    identity: data.identity
                }
        
        
                const token = new AccessToken(
                    accountSid,
                    keySid,
                    secret,
                    {
                        identity: info.identity, // Provide the identity of the user
                    }
                );
        
        
                // Grant the access token Twilio Video capabilities
                const grant = new VideoGrant();
                grant.room = info.room;
                token.addGrant(grant);
        
        
        
                client.video.rooms.create({
                    uniqueName: info.room,
                })
                    .then((room) => {
                        cb({status: 'ok',
                        token: token.toJwt(),
                        room:room.sid})

                        userSide.emit("joinRoom",{status: 'ok',
                        token: token.toJwt(),
                        room:room.sid})
                    

                       
                    })
                    .catch((error) => {
                        console.error('Error creating room:', error);
                    });
        
        
   
        
            } catch (err) {
                res.status(500).json({
                    error: err.message
                })
            }
        })
    })




    userSide.emit('joinRoom')
}


module.exports={ socket }