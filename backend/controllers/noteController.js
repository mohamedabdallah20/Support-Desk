const asyncHandler = require('express-async-handler')

// const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')

// @desc    Get Notes for a tickets
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  //   get user
  const loggedUser = req.user

  if (!loggedUser) {
    res.status(401)
    throw new Error('User Not found')
  }
  const ticket = await Ticket.findById(req.params.ticketId)
  if (!ticket) {
    res.status(400)
    throw new Error('Ticket Not Found')
  }
  if (ticket.user.toString() !== loggedUser._id.toString()) {
    res.status(401)
    throw new Error('Not Auth')
  }
  const notes = await Note.find({
    ticket: req.params.ticketId,
  })
  res.status(200).json(notes)
})

// @desc    Create new ticket Note
// @route   POST /api/tickets/:ticketId/notes
// @access  Private
const createNote = asyncHandler(async (req, res) => {
  const loggedUser = req.user

  if (!loggedUser) {
    res.status(401)
    throw new Error('User Not found')
  }
  const ticket = await Ticket.findById(req.params.ticketId)
  if (!ticket) {
    res.status(400)
    throw new Error('Ticket Not Found')
  }
  if (ticket.user.toString() !== loggedUser._id.toString()) {
    res.status(401)
    throw new Error('Not Auth')
  }
  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    user: loggedUser._id,
    ticket: ticket._id,
  })
  res.status(201).json(note)
})

module.exports = {
  getNotes,
  createNote,
}
