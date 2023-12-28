const  express = require('express');
const { signUp, signIn, google, signOut,  } = require('../Controllers/auth.controller.js');


const  router = express.Router();

router.post('/signup',signUp);
router.post('/login',signIn);
router.post('/google',google);
router.get('/signout',signOut);


module.exports = router;