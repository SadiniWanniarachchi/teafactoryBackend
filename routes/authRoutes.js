const express = require('express');
const router = express.Router()
const cors = require('cors')
const { test, registerUser, loginUser, getUserDetails } = require('../controllers/authController')


router.get('/', test)
router.post('/user', registerUser)
router.post('/login', loginUser)
router.get('/user/:id', getUserDetails);

module.exports = router 