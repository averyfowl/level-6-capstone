const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    text: { 
      type: 
      String, 
      required: true 
    },
    user: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    username: String,
  },
  { timestamps: true }
)

const campsiteSchema = new Schema({
  name: { type: String, required: true },
  town: { type: String, required: true },
  state: { type: String, required: true },
  where: { type: String },
  description: { type: String, required: true },
  cost: { type: String, enum: ['free', 'paid'], required: true },
  image: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [commentSchema],
})

module.exports = mongoose.model('Campsite', campsiteSchema)



