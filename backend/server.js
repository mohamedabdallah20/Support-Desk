const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 8888

const app = express()

// body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// User Routes
app.use('/api/users', require('./routes/userRoutes'))
// error handler middleware
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`)
})
