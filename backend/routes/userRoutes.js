const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
  allAccess,
  adminStatus,
  userStatus,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/me', protect, getMe);
router.get('/publicData', allAccess);
router.get('/adminStatus', adminStatus);
router.get('/userStatus', protect, userStatus);

module.exports = router