const express = require('express')
const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 8888

const app = express()

app.get('/', (req, res) => {
  res.json({ message: 'GET request to the homepage' })
})

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`)
})
