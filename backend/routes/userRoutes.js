const express = require('express')
const auth = require('../middleware/auth')
const {
  loginUser,
  registerUser,
  getMe,
} = require('../controllers/userController')

const router = express.Router()

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', auth, getMe)

module.exports = router
