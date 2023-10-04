const mongoose = require('mongoose')

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Enter a name'],
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Please Enter an Email'],
      unique: true,
    },
    // mobile: {
    //   type: String,
    //   required: [true, 'Please Enter a Phone number'],
    //   unique: true,
    // },
    password: {
      type: String,
      required: [true, 'Please Enter a Password'],
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

//Export the model
module.exports = mongoose.model('User', userSchema)
