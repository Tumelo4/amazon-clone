import type { NextApiRequest, NextApiResponse } from 'next'
import { buffer } from 'micro'
// By default, Next.js API routes are same-origin only. To allow Stripe webhook event requests to reach your API route
// Add micro-cors
import Cors from 'micro-cors'
import * as admin from 'firebase-admin'
import { ServiceAccount } from 'firebase-admin';

// config used to disable default parsing behavior API routes from Next.js
// To avoid someone finding out webhook URL and send fake requests
export const config = {
    api: {
      bodyParser: false,
      externalResolver: true
    },
};

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
})



const serviceAccountKey = {
  type: process.env.type || '',
  project_id:  process.env.project_id || '',
  private_key_id:  process.env.private_key_id || '',
  private_key:  process.env.private_key || '',
  client_email:  process.env.client_email || '',
  client_id:  process.env.client_id || '',
  auth_uri:  process.env.auth_uri || '',
  token_uri:  process.env.token_uri || '',
  auth_provider_x509_cert_url:  process.env.auth_provider_x509_cert_url || '',
  client_x509_cert_url:  process.env.client_x509_cert_url || ''
} as ServiceAccount;


// Only initializeApp once
const app = !admin.apps.length ? admin.initializeApp({ credential: admin.credential.cert(serviceAccountKey) }) : admin.app()

const push_Information_to_firebase_database = async (event: any) => {

  if (event.type === "checkout.session.completed") {
    const session = event.data.object
    const { email, images } = session.metadata
    const amount = session.amount_total / 100

    const order = {
      amount,
      images: JSON.parse(images),
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    }

    return app
      .firestore()
      .collection('users')
      .doc(email)
      .collection('orders')
      .doc(session.id)
      .set(order)
      .then(() => {
        console.log(`Order ${session.id} saved to Firestore.`)
      })
      .catch((err: any) => {
        console.error(`Error saving order ${session.id} to Firestore: ${err.message}`)
      })
  } else {
    return Promise.resolve()
  }
}
// Stripe 
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const webhook_end_point_secrete = process.env.STRIPE_WEBHOOK_SECRET || '';

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  // validate if request is post
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return
  }

  // Get the signature sent by Stripe
  const sig = req.headers['stripe-signature'] as string;
  const buf = await buffer(req)
  const payload = buf.toString()
  let event;

  // verify that event posted came from stripe
  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhook_end_point_secrete);
  } catch (err: any) {
    console.log(err)
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
    
  // Handle the event
  try {
    await push_Information_to_firebase_database(event)
    return res.status(200).end()
  } catch (err:any) {
    console.error(`Error saving Stripe event to Firestore: ${err.message}`)
    return res.status(500).send(`Webhook Error: ${err.message}`)
  }

}
  
export default cors(webhookHandler as any);