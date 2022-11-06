const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    roles: {
      type: Array,
      'default': ["ROLE_USER"]
    },
    refreshToken: {
      type: String
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)