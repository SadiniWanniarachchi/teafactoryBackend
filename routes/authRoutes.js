const express = require('express');
const router = express.Router()
const cors = require('cors')
const { test, registerUser, loginUser, getUserDetails, updateUser, deleteUser } = require('../controllers/authController')


router.get('/', test)
router.post('/user', registerUser)
router.post('/login', loginUser)
router.get('/user/:id', getUserDetails);
router.put('/user/:id', updateUser); // Update a user
router.delete('/user/:id', deleteUser); // Delete a user

module.exports = router 