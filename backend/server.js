const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const cors = require('cors')

const PORT = process.env.PORT || 8888
// connect to DB
connectDB()

// initialize the App
const app = express()

// body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// cors middleware
const corsOptions = {
  origin: 'https://ticket-support-desk.onrender.com', // frontend URI (ReactJS)
}
app.use(cors(corsOptions))

// User Routes
app.use('/api/users', require('./routes/userRoutes'))

// Tickets Routes
app.use('/api/tickets', require('./routes/ticketRoutes'))

// error handler middleware
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`)
})
