<<<<<<< HEAD
// models/bookingModel.js
=======
>>>>>>> 919631285b4e87442e7d296a153a2e97ca22152f
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Booking must belong to a Tour!']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a User!']
  },
  price: {
    type: Number,
<<<<<<< HEAD
    required: [true, 'Booking must have a price.']
=======
    require: [true, 'Booking must have a price.']
>>>>>>> 919631285b4e87442e7d296a153a2e97ca22152f
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  paid: {
    type: Boolean,
    default: true
  }
});

bookingSchema.pre(/^find/, function(next) {
  this.populate('user').populate({
    path: 'tour',
    select: 'name'
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
