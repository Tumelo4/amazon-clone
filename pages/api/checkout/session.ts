
import { itemProps } from '@/redux/cartslice';
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export default async function handler(req : NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            // Create Checkout Sessions from body params.
            const cartItems: itemProps[] = req.body.ItemsArr;
            const email = req.body.email

            const params: Stripe.Checkout.SessionCreateParams = {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
        
                line_items: cartItems.map((item) => {
                    const { image, price, title } = item.item
                
                    return {
                        price_data: { 
                            currency: 'usd',
                            product_data: { 
                                name: title,
                                images: [image],
                            },
                            unit_amount: price * 100,
                        },
                        adjustable_quantity: {
                            enabled:true,
                            minimum: 1,
                        },
                        quantity: item.qty
                    }
                }),
                success_url: `${req.headers.origin}/orders/orders`,
                cancel_url: `${req.headers.origin}/cart/checkout`,
                metadata: {
                    email: email,
                    images: JSON.stringify(cartItems.map((item) => item.item.image))
                },
            }
            
            const session = await stripe.checkout.sessions.create(params)
            res.status(200).json({id: session.id});
        }
        catch (err: any) {
            const errorMessage = err instanceof Error ? err.message : 'Internal server error'
            res.status(500).json({ statusCode: 500, message: errorMessage })
        }
    }
    else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method Not Allowed')
    }
}