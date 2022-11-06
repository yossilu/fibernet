const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  const jwtToken = req.cookies.jwt
  if ( jwtToken ) {
    try {

      // Verify token
      const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET)
      // Get user from the token
      req.user = await User.findOne({username: decoded.username.toLowerCase()});

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!jwtToken) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }