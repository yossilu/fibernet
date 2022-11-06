const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

///TESTS METHODS
const allAccess = (req, res) => {
  res.status(200).send("Public Content.");
}

const userStatus = (req, res) => {
  
  res.status(200).send("User Content.");
}

const adminStatus = (req, res) => {
  res.status(200).send("Admin Content.");
}

///TESTS METHODS

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({username: username.toLowerCase()})

  if (userExists) {
    res.status(409)
    throw new Error('User already exists')
  }

  //encrypt the password
  const hashedPwd = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    username,
    email,
    password: hashedPwd,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body
  // Check for username
  const myUsername = username.toLowerCase();
  const user = await User.findOne({ username: myUsername })
  if (!username || !password) return res.status(400).json({ 'message': 'username and password are required.' });
  if (!user.username) return res.sendStatus(401); //Unauthorized 

  if (user && (await bcrypt.compare(password, user.password))) {
    // create JWTs
    const accessToken = jwt.sign(
        {
          username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
    const refreshToken = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
    // Saving refreshToken with current user
    user.refreshToken = refreshToken;
    const result = await User.findOneAndUpdate({username: user.username}, {refreshToken: refreshToken}, {upsert: true});

    // Creates Secure Cookie with refresh token
    res.cookie('jwt', refreshToken);

    // Send authorization roles and access token to user
    res.json({ username, email, roles: user.roles, accessToken });
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

const logoutUser = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;
  // Is refreshToken in db?
  const user = await User.findOne({ refreshToken });
  const id = user._id;
  if (!user) {
      res.clearCookie('jwt');
      return res.sendStatus(204).json({message: "user logged out"});
  }
  // {httpOnly: true, sameSite: 'None', secure: true }

  // Delete refreshToken in db
  const result = await User.updateOne({_id:id}, {refreshToken: ''}, {upsert: true});
  if(result.acknowledged && user){
    res.clearCookie('jwt');
    res.status(204).json({message: "user logged out"});
  }
  
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  allAccess,
  userStatus,
  adminStatus
}