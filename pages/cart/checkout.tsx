import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectorItems, selectorSubtotal } from '@/redux/cartslice'
import CartProduct from '@/components/CartProduct'
import { formatCurrency } from '@/utilities/formatCurrency'
import { getStripe } from '@/lib/getStripe'
import axios from 'axios'
import SignInButton from '@/components/SignInButton'
import { GetServerSideProps } from 'next'
import { getServerSession, Session } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'

interface CheckoutProps {
    session: Session | null
}

const Checkout = ({session}: CheckoutProps) => {
    const Items = useSelector(selectorItems);

    const subtotal = useSelector(selectorSubtotal)

    const priceStyle = useMemo(() => formatCurrency(subtotal), [subtotal])

    const handle_Checkout = async () => {
    
        //  standard fetch API  provides a simple and lightweight interface for making HTTP requests
        // const checkoutSession = await fetch('/api/checkout/session', {
        //   method: 'POST',
        //   headers: {
        //     'content-type': 'application/json'
        //   },
        //   body: JSON.stringify({ ItemsArr: Items.items,  email: session?.user?.email})
        // })

        // Axios support older browser
        const checkoutSession = await axios.post('/api/checkout/session', {
            ItemsArr: Items.items,
            email: session?.user?.email || ''
        })
       
        if (checkoutSession.status !== 200) return;
        
        const stripe = await getStripe();
        const { error } = await stripe!.redirectToCheckout({
          // Make the id field from the Checkout Session creation API response
          // available to this file, so you can provide it as parameter here
          // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
          sessionId: checkoutSession.data.id,
        });
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
        console.warn(error.message);
    } 
    
  return (
      <div className='w-full h-full bg-gray-200 overflow-hidden'>
          {
              session ?
                  (
                    <div className=' max-w-4xl m-auto'>
                        {
                            Items.total === 0 ?
                            (
                                <div>
                                    <div className=' bg-white my-4 p-5 w-full'>
                                        <p className=' capitalize font-medium text-2xl'>
                                            Your amazon cart is empty
                                        </p>
                                        <p className=' mt-2 text-[13px]'>
                                            Your Shopping Cart lives to serve&#46; Give it purpose - fill it with groceries&#44; clothing&#44; houseold supplies&#44; electronics&#44; and more&#46;
                                        </p>
                                        <p className=' text-[13px]'>
                                            Continue shopping on the <span className=' cart_hover_underline'>Amazon.com homepage&#44;</span> learn about <span className='cart_hover_underline'>today's deals&#44;</span> or visit your <span className='cart_hover_underline'>Wish List</span>
                                        </p>
                                    </div>
                                    <div className=' bg-white my-4 mt-0 p-5 w-full'>
                                        <p className=' capitalize text-xl font-semibold '>
                                            Your items 
                                        </p>
                                        <div className='flex items-center gap-4 w-full border-b-[1px] border-b-gray-300 px-5 text-xs'>
                                            <p className=' cursor-pointer text-blue-500 py-2'>
                                                No items saved for later
                                            </p>
                                            <p className=' text-balck border-b-2 border-b-orange-500 font-bold py-2'>
                                                Buy it again
                                            </p>
                                        </div>
                                        <p className='text-sm mt-1'>
                                            No items to Buy again. 
                                        </p>
                                    </div>  
                                </div>
                            ) :
                            (
                                <div className=' flex my-8 gap-4 flex-col md:flex-row'>
                                        {/* Left container */}
                                        <div className=' bg-white w-full p-5'>
                                            <div className=' border-b-[1px] border-b-gray-300'>
                                                <h1 className=' text-3xl font-semibold'>Shopping Cart</h1>
                                                {/* Select All and Deselect all items */}
                                                {/* <p>Deselect all items</p> */}
                                                <div className=' flex justify-end'>
                                                    <p className=' text-gray-400 text-xs pb-[2px]'>price</p>
                                                </div>
                                            </div>
                                            {
                                                Items.items.map((item) => (
                                                    <CartProduct key={item.item.id} {...item}  />
                                                ))
                                            }

                                              <div className=' mt-4 flex w-full justify-end'>
                                                  <h2 className=' whitespace-nowrap text-base font-medium'>
                                                      Subtotal &#40;{Items.total} items&#41;&#58; <span className=' font-semibold'>{priceStyle}</span>
                                                  </h2>
                                            </div>
        
                                        </div>
                                        {/* Right container */}
                                        <div className='flex flex-col p-4 pb-8 bg-white gap-2 h-full'>
                                            <h2 className=' whitespace-nowrap text-base font-medium'>
                                                Subtotal &#40;{Items.total} items&#41;&#58; <span className=' font-semibold'>{priceStyle}</span>
                                            </h2>
                                            <div className=" pl-1 flex items-center mb-4">
                                            <input
                                                id="default-checkbox"
                                                type="checkbox"
                                                value=""
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                className="ml-2 -mb-[4px] text-[11px] font-medium text-black"
                                            >
                                                This order contains a gift
                                            </label>
                                            </div>
                                            <button
                                                onClick={handle_Checkout} 
                                                type='button'
                                                className=' rounded-lg p-2 text-xs md:text-sm bg-gradient-to-b from-yellow-200 to-yellow-400  border-yellow-300 focus:ring-2 focus:ring-yellow-500 active:from-yellow-500  focus:outline-none'
                                            >
                                                Proceed to checkout
                                            </button> 
                                        </div>
                                </div> 
                            )
                        }
                        
                    </div>  
                  ) : (<SignInButton />)
          }
          
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // ...
    const session = await getServerSession(context.req, context.res, authOptions)

    return { props: {session} };
}
  

export default Checkout