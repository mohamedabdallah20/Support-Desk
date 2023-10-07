const express = require('express')
const router = express.Router()
const { getTickets, createTicket } = require('../controllers/ticketController')

const auth = require('../middleware/auth')

router.route('/').get(auth, getTickets).post(auth, createTicket)

module.exports = router
