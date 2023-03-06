import { buffer } from 'micro' // It provides small functions that help dealing with requests
import type { NextApiRequest, NextApiResponse } from 'next'
// import Stripe from "stripe";
import * as admin from 'firebase-admin'
// import * as serviceAccount from "@/serviceAccountKey.json";

// Secure connection to firebase
// const serviceAccount:admin.ServiceAccount = {
//   project_id:  process.env.project_id || '',
//   private_key_id:  process.env.private_key_id || '',
//   private_key:  process.env.private_key || '',
//   client_email:  process.env.client_email || '',
//   client_id:  process.env.client_id || '',
//   auth_uri:  process.env.auth_uri || '',
//   token_uri:  process.env.token_uri || '',
//   auth_provider_x509_cert_url:  process.env.auth_provider_x509_cert_url || '',
//   client_x509_cert_url:  process.env.client_x509_cert_url || ''
// }

// config used to disable default parsing behavior API routes from Next.js
// To avoid someone finding out webhook URL and send fake requests
export const config = {
    api: {
      bodyParser: false,
      externalResolver: true
    },
};


// Only initializeApp once
const app = !admin.apps.length ? admin.initializeApp({ credential: admin.credential.cert({
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
}) }) : admin.app()

const push_Information_to_firebase_database = async (session: any) => {
  
  return app
    .firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection('orders')
    .doc(session.id)
    .set({
    amount: session.amount_total / 100,
    images: JSON.parse(session.metadata.images),
    timestamp: admin.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
    console.log(`Sucess: Order ${session.id} had been added to the DB`)
  })
}
// Stripe 
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const webhook_end_point_secrete = process.env.STRIPE_WEBHOOK_SECRET || '';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    
  if (req.method === "POST") {
      
    const buf = await buffer(req);
    const payload = buf.toString();
    // Get the signature sent by Stripe
    const sig = req.headers["stripe-signature"];

    let event;

    // check if webhook secret it's not empty
    if (webhook_end_point_secrete.length > 0) {
      // verify that event posted came from stripe
      try {
        event = stripe.webhooks.constructEvent(payload, sig, webhook_end_point_secrete);
      } catch (err: any) {
        console.log(err)
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      
    } else {
      console.log('webhook_end_point_secrete is empty')
      return
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        // FulFill the order by push information to firebase database
        return push_Information_to_firebase_database(session)
          .then(() => res.status(200))
          .catch((err: any) => {
            console.log(err)
            res.status(400).send(`Webhook Error: ${err.message}`)
          })
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
        break;
    }

  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }

}
  
export default handler;
  