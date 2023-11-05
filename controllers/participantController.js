const twilio = require('twilio');
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;

exports.generateToken = async (req, res) => {
  try {
    const { roomName, identity } = req.body;

    const token = new AccessToken(
      TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET
    );

    token.identity = identity;

    const videoGrant = new VideoGrant({ room: roomName });
    token.addGrant(videoGrant);

    return res.status(200).json({
        status: 'ok',
        token: token.toJwt()
    })

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while generating the token.' });
  }
};
