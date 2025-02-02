const express = require('express');
const router = express.Router()
const cors = require('cors')
const { test, registerUser } = require('../controllers/authController')

//middleware
/*router.use(

  cors({

    credentials: true,

  })
)*/

router.get('/', test)
router.post('/user', registerUser)

module.exports = router