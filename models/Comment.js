const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    campsiteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campsite',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    username: String,
  },
  { timestamps: true }
)

module.exports = mongoose.model('Comment', commentSchema)
