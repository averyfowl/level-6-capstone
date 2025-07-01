const express = require('express')
const Campsite = require('../models/Campsite')
const router = express.Router()

// Create new campsite
router.post('/', async (req, res, next) => {
  try {
    console.log("REQ.AUTH:", req.auth)
    req.body.user = req.auth._id
    const newCampsite = new Campsite(req.body)
    const saved = await newCampsite.save()
    res.status(201).send(saved)
  } catch (err) {
    next(err)
  }
})


// Get all campsites (public)
router.get('/', async (req, res, next) => {
  try {
    const campsites = await Campsite.find()
      .populate('user', 'username')
      .exec()
    res.status(200).send(campsites)
  } catch (err) {
    next(err)
  }
})

// Get campsites owned by logged-in user
router.get('/user', async (req, res, next) => {
  try {
    const userCampsites = await Campsite.find({ user: req.auth._id })
    res.status(200).send(userCampsites)
  } catch (err) {
    next(err)
  }
})

// Update a campsite (only owner)
router.put('/:campsiteId', async (req, res, next) => {
  try {
    const updated = await Campsite.findOneAndUpdate(
      { _id: req.params.campsiteId, user: req.auth._id },
      req.body,
      { new: true }
    )
    res.status(200).send(updated)
  } catch (err) {
    next(err)
  }
})

// Delete a campsite (only owner)
router.delete('/:campsiteId', async (req, res, next) => {
  try {
    const deleted = await Campsite.findOneAndDelete({
      _id: req.params.campsiteId,
      user: req.auth._id,
    })
    res.status(200).send(deleted)
  } catch (err) {
    next(err)
  }
})

//post a comment
router.post("/:campsiteId/comments", async (req, res, next) => {
  try {
    const campsite = await Campsite.findById(req.params.campsiteId)
    const newComment = {
      text: req.body.text,
      user: req.auth._id, // assuming you're using JWT auth
      username: req.auth.username
    }
    campsite.comments.push(newComment)
    await campsite.save()

    const updated = await Campsite.findById(req.params.campsiteId).populate("user").populate("comments.user", "username")
    res.status(201).send(updated)
  } catch (err) {
    next(err)
  }
})


// Delete comment
router.delete('/:campsiteId/comments/:commentId', async (req, res, next) => {
  try {
    const { campsiteId, commentId } = req.params
    const updatedCampsite = await Campsite.findByIdAndUpdate(
      campsiteId,
      { $pull: { comments: { _id: commentId, user: req.auth._id } } },
      { new: true }
    )
    res.status(200).send(updatedCampsite)
  } catch (err) {
    next(err)
  }
})

module.exports = router




