const express = require('express')

const PORT = process.env.PORT | 8888

const app = express()

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`)
})
