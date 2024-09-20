var express = require('express');
var router = express.Router();

const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const {OAuth2Client} = require('google-auth-library');
const { Domain } = require('../../frontend/src/utils/constants');


/* GET users listing. */
router.post('/', async function(req, res, next) {
  res.header("Access-Control-Allow-Origin", 'https://task-management.kushal-bankhede.live');
  res.header("Access-Control-Allow-Credentials", 'true');
  res.header("Referrer-Policy","no-referrer-when-downgrade");
  const redirectURL = `https://task-management.kushal-bankhede.live/oauth`;

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
      redirectURL
    );

    // Generate the url that will be used for the consent dialog.
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/userinfo.profile  openid ',
      prompt: 'consent'
    });

    res.json({url:authorizeUrl})

});

module.exports = router;