const mongoose = require('mongoose')

// Declare the Schema of the Mongo model
var ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
      type: String,
      required: [true, 'Please Select a product'],
      enum: ['iphone', 'Mac book pro', 'iPad', 'iMac'],
    },
    description: {
      type: String,
      required: [true, 'Please Enter a description of the issue'],
    },
    status: {
      type: String,
      require: true,
      enum: ['open', 'new', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
)

//Export the model
module.exports = mongoose.model('Ticket', ticketSchema)
