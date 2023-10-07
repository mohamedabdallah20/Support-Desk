const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
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

  res.status(200).json({ tickets })
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

module.exports = {
  getTickets,
  createTicket,
}
