const express = require('express');
const router = express.Router()
const cors = require('cors')
const { test, registerUser, loginUser, getUserDetails, updateUser, deleteUser, getAllUsers } = require('../controllers/authController')


router.get('/', getAllUsers)
router.post('/user', registerUser)
router.post('/login', loginUser)
router.get('/user/:id', getUserDetails);
router.put('/:id', updateUser); // Update a user
router.delete('/:id', deleteUser); // Delete a user

module.exports = router 