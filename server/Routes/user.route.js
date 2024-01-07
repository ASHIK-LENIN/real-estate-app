const express = require('express');
const { test,
    updateUser,
    deleteUser,
    getUserListings,
    getUser
} = require('../Controllers/user.controller');
const verifyToken = require('../utils/verifyUser')

const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listing/:id', verifyToken, getUserListings);
router.get('/:id', verifyToken, getUser);

module.exports = router;