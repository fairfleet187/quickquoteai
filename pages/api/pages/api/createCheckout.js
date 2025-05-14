// pages/api/createCheckout.js
import { stripe } from '../../lib/stripe';

export default async function handler(req, res) {
  const { description, quantity, unitPrice } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: description },
        unit_amount: unitPrice * 100
      },
      quantity
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`
  });
  res.status(200).json({ sessionUrl: session.url });
}
