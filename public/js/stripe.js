<<<<<<< HEAD
/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51QNq5tJu5mWZxVALR856hGUg0WTuqKc2vBOLGY2FuxHXTREKIzbviSGoMmc0dWhyQ6VIv4OTEa077OLB5vNLi0VK00YU2FNhKH'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
=======
export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const response = await axios({
      method: 'GET',
      url: `/api/v1/bookings/checkout-session/${tourId}`
    });

    if (!response.data || !response.data.session) {
      throw new Error('No session data received');
    }

    // 2) Create checkout form + charge credit card
    const stripe = Stripe(
      'pk_test_51QNq5tJu5mWZxVALGDn4MnL8Bm5UmsmcZI5W3Yn4RWx8VI7CqcVX2Lm10HOjaltyZaQOGeaEHeCSBqa8XJZPwVNo00qLOayBqA'
    );
    const result = await stripe.redirectToCheckout({
      sessionId: response.data.session.id
    });

    if (result.error) {
      throw new Error(result.error.message);
    }
  } catch (err) {
    console.error('Booking error:', err);
    showAlert(
      'error',
      err.response?.data?.message || 'Something went wrong with booking'
    );
>>>>>>> 919631285b4e87442e7d296a153a2e97ca22152f
  }
};
