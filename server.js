require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const { expressjwt } = require('express-jwt')
const errorHandler = require('./middleware/errorHandler')
const path = require('path')

const authRouter = require('./routes/authRouter')
const campsiteRouter = require('./routes/campsiteRouter')

const app = express()

// Middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "dist")))

// Connect to DB- Mongo
async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('MongoDB connection error:', err)
  }
}
connectToDb()

// Routes
app.use('/api/auth', authRouter)

const jwt = expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] })

app.use('/api/main/campsites', jwt, campsiteRouter)


// // Protect routes below with JWT *******************
// app.use(
//   '/api/main',
//   expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] })
// )
// //campsite functionality
// app.use('/api/main/campsites', campsiteRouter)

// Global error handler
app.use(errorHandler)

// app.get("/*", (req, res) => res.sendFile(path.join(__dirname, "client", "dist", "index.html")))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

// Start server
const PORT = process.env.PORT || 6666
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


