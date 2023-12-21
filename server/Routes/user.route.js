const express = require('express');
const { test, updateUser } = require('../Controllers/user.controller');
const  verifyToken  = require('../utils/verifyUser')

const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);

module.exports = router;