const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const User = db.user;

const twilio = require('twilio');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const { connect } = require('twilio-video');




const keySid = 'SK613297cb1fbd96e18047d4d271a77066';
const accountSid = 'ACbb6d2eee8eeb610710b1501d10d32d2f';
const authToken = '888f476669a3ed53ac2f185c4951a3be';
const secret = 'pwROEGm7pGVxYm7nu5l3NgeWqxQDoSaK';
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;


const client = require('twilio')(accountSid, authToken);







// 1.create product
const addtwillio = async (req, res) => {

    try {
        let info = {
            room: crypto.randomBytes(16).toString("hex"),
            identity: req.params.identity
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
                return res.status(200).json({
                    status: 'ok',
                    data: token.toJwt(),
                    room: room.sid,
                    identity:info.identity
                })
            })
            .catch((error) => {
                return res.status(200).json({
                    status: 'fail',
                    message: error.message,
                })
                // console.error('Error creating room:', error);
            });


    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}






// 1.create product
const jointwillio = async (req, res) => {

    try {
        let info = {
            token: req.params.token,
            room: req.params.room,
            identity: req.params.identity
        }




        let Users = await User.findOne({
            where: { id: info.identity }
        })

        if(Users){
            connect(info.token, { name: info.room }).then(room => {

                console.log(`Successfully joined a Room: ${room}`);
                room.on('participantConnected', participant => {
                    console.log(`A remote Participant connected: ${participant}`);
                });
                return res.status(200).json({
                    status: 'ok',
                    room:room
                })
            }, error => {
                return res.status(200).json({
                    status: 'ok',
                    message:error.message
                })
                // console.error(`Unable to connect to Room: ${error.message}`);
            });

        }




        


    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}







module.exports = {
    addtwillio,
    jointwillio,
}



