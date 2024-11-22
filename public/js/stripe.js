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
  }
};
