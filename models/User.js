const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
//how documents are handled and stored in mongoDb
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  memberSince: {
    type: Date,
    default: Date.now,
  },
})

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      this.password = await bcrypt.hash(this.password, 10)
      next()
    } catch (err) {
      next(err)
    }
  } else {
    next()
  }
})

// Compare password method
userSchema.methods.checkPassword = function (passwordAttempt) {
  return bcrypt.compare(passwordAttempt, this.password)
}

// Return user object without password
userSchema.methods.withoutPassword = function () {
  const userObj = this.toObject()
  delete userObj.password
  return userObj
}

module.exports = mongoose.model('User', userSchema)

