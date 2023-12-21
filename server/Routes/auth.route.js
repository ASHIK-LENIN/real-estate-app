const  express = require('express');
const { signUp, signIn, google,  } = require('../Controllers/auth.controller.js');


const  router = express.Router();

router.post('/signup',signUp)
router.post('/login',signIn)
router.post('/google',google)


module.exports = router;