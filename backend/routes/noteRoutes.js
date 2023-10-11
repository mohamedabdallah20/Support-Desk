const express = require('express')
const router = express.Router({ mergeParams: true })
const { getNotes, createNote } = require('../controllers/noteController')

const auth = require('../middleware/auth')

router.route('/').get(auth, getNotes).post(auth, createNote)
// router
//   .route('/:id')
//   .get(auth, getTicket)
//   .delete(auth, deleteTicket)
//   .put(auth, updateTicket)

module.exports = router
