const express = require('express')
const router = express.Router()
const {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
} = require('../controllers/ticketController')

const auth = require('../middleware/auth')

// Re-Route into note router
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)

router.route('/').get(auth, getTickets).post(auth, createTicket)
router
  .route('/:id')
  .get(auth, getTicket)
  .delete(auth, deleteTicket)
  .put(auth, updateTicket)

module.exports = router
