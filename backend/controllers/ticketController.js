const asyncHandler = require('express-async-handler')

// const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc    Get user tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  //   get user
  const user = req.user

  if (!user) {
    res.status(401)
    throw new Error('User Not found')
  }
  const tickets = await Ticket.find({
    user: user._id,
  })

  res.status(200).json([...tickets])
})

// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body
  if (!product || !description) {
    res.status(400)
    throw new Error('Please Add product and description')
  }
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user._id,
  })
  res.status(201).json({ ticket })
})

// @desc    Get user single ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
  //   get user
  const user = req.user

  if (!user) {
    res.status(401)
    throw new Error('User Not found')
  }
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(400)
    throw new Error('Ticket Not Found')
  }

  if (ticket.user.toString() !== user._id.toString()) {
    res.status(401)
    throw new Error('Not Auth')
  }
  res.status(200).json({ ticket })
})
// @desc    Delete user single ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  //   get user
  const user = req.user

  if (!user) {
    res.status(401)
    throw new Error('User Not found')
  }
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(400)
    throw new Error('Ticket Not Found')
  }

  if (ticket.user.toString() !== user._id.toString()) {
    res.status(401)
    throw new Error('Not Auth')
  }
  await Ticket.deleteOne(ticket)
  res.status(200).json({ success: true })
})
// @desc    Update user single ticket
// @route   Put /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
  //   get user
  const user = req.user

  if (!user) {
    res.status(401)
    throw new Error('User Not found')
  }
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(400)
    throw new Error('Ticket Not Found')
  }

  if (ticket.user.toString() !== user._id.toString()) {
    res.status(401)
    throw new Error('Not Auth')
  }
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )
  res.status(200).json({ updatedTicket })
})

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
}
