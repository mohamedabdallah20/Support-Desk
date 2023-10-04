const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const auth = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // get token from header
      const token = req.headers.authorization.split(' ')[1]
      // verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // get user from token
      req.user = await User.findById(decoded._id).select('-password')
      //   console.log(req.user)
    } catch (error) {
      res.status(401)
      throw new Error('NOT AUTH ')
    }
  } else {
    res.status(400)
    throw new Error('there is no Tokens')
  }

  next()
})

module.exports = auth
