import React from 'react'
import { GoSearch } from 'react-icons/go'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { MdOutlineArrowDropDown } from 'react-icons/md'
import { GetServerSideProps } from 'next';
// drastically reduce response time when used over getSession on server-side, due to avoiding an extra fetch to an API Route
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import SignInButton from '@/components/SignInButton';
import { getDocs, collection, where, query, orderBy } from "firebase/firestore";
import db from '@/Firebase/firebase';
import moment from 'moment';
import Order from '@/components/Order';
import { Session } from 'next-auth';

export interface Orderprops {
  id: string;
  amount: number;
  images: [string];
  timestamp: number;
  items: [{
    id: string;
    object: string;
    amount_discount: number;
    amount_subtotal: number;
    amount_tax: number;
    amount_total: number;
    currency: string;
    description: string;
    price: {
      id: string;
      object: string;
      active: boolean;
      billing_scheme: string;
      created: number;
      currency: string;
      custom_unit_amount: number | null;
      livemode: boolean;
      lookup_key: string | null;
      metadata: Record<string, any>;
      nickname: string | null;
      product: string;
      recurring: null;
      tax_behavior: string;
      tiers_mode: string | null;
      transform_quantity: null;
      type: string;
      unit_amount: number;
      unit_amount_decimal: string;
    };
    quantity: number;
  }];
}

type OrdersProps = {
  orders: Orderprops[],
  session: Session | null
}

const Oders = ({orders, session}: OrdersProps) => {
  // console.log(orders.length)
  return (
    <div className=' max-w-4xl m-auto'>
      {
        session ? (
          <div className=' w-full'>
            <div className='my-2 flex capitalize text-[13px] font-medium gap-[6px] items-center px-2 lg:px-0'>
              <p className=' cursor-pointer  text-blue-500 hover:text-orange-500 hover:underline hover:underline-offset-1 duration-150'>Your Account</p>
              <NavigateNextIcon className=' text-[11px] -mb-[2px]' />
              <p className='text-orange-400'>your orders</p> 
            </div>
            
            <div className='flex flex-col sm:flex-row gap-2 justify-between items-center mt-5 px-2 lg:px-0'>
              <p className=' capitalize font-medium text-3xl'>Your Orders</p>
              <div className='w-full flex sm:w-auto  px-2 sm:px-0 items-center space-x-2 max-w-lg sm:max-w-none m-auto'>
                    <div className='w-full flex sm:w-auto items-center text-sm p-[4px] border-gray-500 rounded-sm border-[1px]'>
                        {/* search icon */}
                        <GoSearch className='mx-2'/>
                        <input type="text" placeholder='search all orders' className='pl-[6px] w-full sm:w-[13rem] md:w-[20rem] focus:outline-none'/>
                    </div> 
                    <button className='hidden sm:block capitalize font-semibold bg-[#353133] hover:bg-[#0f0d0e] text-sm py-[5px] px-2 text-white rounded-2xl duration-200 ease-in-out'>search orders</button>
              </div>

            </div>
            <div className='flex items-center gap-8 border-b-[1px] border-b-[#ddd6da] my-5 px-5 overflow-x-auto scrollbar-hide'>
                <p className='py-2 text-[13px] capitalize cursor-text font-bold text-black border-b-2 border-b-orange-500'>orders</p>
                <p className='order_links '>buy again</p>
                <p className='order_links '>not yet shipped</p>
                <p className='order_links '>digital orders</p>
                <p className='order_links '>local store orders</p>
                <p className='order_links '>cancelled orders</p>
            </div>
            {
              orders && orders.length === 0 
                ? (
                  <div className=' w-full'>
                    <div className=' text-[13px] flex items-center gap-2'>
                        {/* Number of items ordered */}
                        <div className='flex items-center space-x-1'>
                          <p className=' font-bold'>
                              0 orders
                          </p>
                          <p>
                            placed in
                          </p> 
                        </div>
                        
                        <button className=' flex items-center space-x-2 bg-[#f0ebee] hover:bg-[#ddd7db] rounded-lg py-[6px] px-2 border-[1px] border-[#bbb6b9]'>
                          past 3 months
                          {/* drop down icon */}
                          <MdOutlineArrowDropDown className=' h-5 w-5'/>
                        </button>
                    </div>
                    <div className=' text-sm font-normal my-8 mx-2 flex justify-center items-center space-x-2'>
                        <p>Looks like you haven&#39;t placed an order in the last 3 months&#46;</p>
                        <p className='text-blue-500 cursor-pointer hover:text-orange-500 hover:underline hover:underline-offset-1'>View orders in 2023</p>
                    </div>
                  </div>
                )
                : (
                  <div className=' mt-5 space-y-4'>
                    {
                      orders?.map((order) => (
                        <Order key = {order.id} {...order} />
                      ) )
                    }
                  </div>
                )
            }
            
          </div>
        ) : (<SignInButton />)
      }
          
    </div>
  )
}

// Nodejs look alike server
export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const session = await getServerSession(context.req, context.res, authOptions)
  
  if (!session) {
    const orders:Orderprops[] = []
    return { props: {orders, session} };
  }

  const email = session.user?.email ?? '';
  // For development:
  // Go in Cloud Firestore Database -> Rules ->
  // Change allow read, write: if false; to true;
  // Because of firestore: PERMISSION_DENIED: Missing or insufficient permissions when you're in development mode
  // Note: It's quick solution for development purpose only because it will turns off all the security. So, it's not recommended for production.
  // For production:
  // If authenticated from firebase: Change allow read, write: if false; to request.auth != null;
  const userOrdersRef = collection(db, 'users', email, 'orders');
  const q = query(userOrdersRef, where('timestamp', '>', new Date(0)), orderBy('timestamp', 'desc'));
  
  const querySnapshot = await getDocs(q)

  // Wrap all with promise
  // Stripe orders
  const orders = await Promise.all(
    querySnapshot.docs.map(async (order) => {
      const lineItems = await stripe.checkout.sessions.listLineItems(order.id, {
        limit: 100
      });
    
      return {
        id: order.id,
        amount: order.data().amount,
        images: order.data().images,
        timestamp: moment(order.data().timestamp.toDate()).unix(),
        items: lineItems.data
      };
    })
  )
 
  return { props: {orders, session} };
}

export default Oders