const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router()

// Signup
router.post('/signup', async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username })
    if (existingUser) {
      res.status(403)
      return next(new Error('Username already taken'))
    }
    const newUser = new User(req.body)
    const savedUser = await newUser.save()
    const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
    res.status(201).send({ token, user: savedUser.withoutPassword() })
  } catch (err) {
    next(err)
  }
})

// Login
router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
      res.status(403)
      return next(new Error('Username or password incorrect'))
    }
    const isMatch = await user.checkPassword(req.body.password)
    if (!isMatch) {
      res.status(403)
      return next(new Error('Username or password incorrect'))
    }
    const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
    res.status(200).send({ token, user: user.withoutPassword() })
  } catch (err) {
    next(err)
  }
})

module.exports = router

