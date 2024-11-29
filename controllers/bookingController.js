const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);
<<<<<<< HEAD
  // console.log(tour);
=======
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found'
    });
  }
>>>>>>> 919631285b4e87442e7d296a153a2e97ca22152f

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
<<<<<<< HEAD
    mode: 'payment',
    // success_url: `${req.protocol}://${req.get('host')}/my-tours/?tour=${
    //   req.params.tourId
    // }&user=${req.user.id}&price=${tour.price}`,
    success_url: `${req.protocol}://${req.get('host')}/`,
=======
    mode: 'payment', // Added this line
    success_url: `${req.protocol}://${req.get('host')}/my-tours?alert=booking`,
>>>>>>> 919631285b4e87442e7d296a153a2e97ca22152f
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
<<<<<<< HEAD
=======
          // Updated to new Stripe API format
>>>>>>> 919631285b4e87442e7d296a153a2e97ca22152f
          currency: 'usd',
          unit_amount: tour.price * 100,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [
              `${req.protocol}://${req.get('host')}/img/tours/${
                tour.imageCover
              }`
            ]
          }
        },
        quantity: 1
      }
    ]
  });

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session
  });
});

<<<<<<< HEAD
const createBookingCheckout = async session => {
  const tour = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email })).id;
  const price = session.display_items[0].amount / 100;
  await Booking.create({ tour, user, price });
};

exports.webhookCheckout = (req, res, next) => {
=======
exports.webhookCheckout = async (req, res, next) => {
>>>>>>> 919631285b4e87442e7d296a153a2e97ca22152f
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

<<<<<<< HEAD
  if (event.type === 'checkout.session.completed')
    createBookingCheckout(event.data.object);
=======
  if (event.type === 'checkout.session.completed') {
    try {
      await createBookingCheckout(event.data.object);
    } catch (err) {
      console.error('Booking creation error:', err);
      return res.status(500).send('Error processing booking');
    }
  }
>>>>>>> 919631285b4e87442e7d296a153a2e97ca22152f

  res.status(200).json({ received: true });
};

<<<<<<< HEAD
=======
const createBookingCheckout = async session => {
  const tour = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email })).id;
  const price = session.amount_total / 100; // Updated to use amount_total
  await Booking.create({ tour, user, price });
};

>>>>>>> 919631285b4e87442e7d296a153a2e97ca22152f
exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
