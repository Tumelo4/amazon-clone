import { itemProps } from '@/redux/cartslice'
import Image from 'next/image'
import React, { useMemo } from 'react'
import { AiOutlinePlus, AiOutlineMinus, AiFillStar } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { useDispatch } from 'react-redux'
import { removeFromCart, increment, decrement } from '@/redux/cartslice'
import { formatCurrency } from '@/utilities/formatCurrency'


const CartProduct = ({ item, qty}: itemProps) => {
    const { title, image, price, id , rating} = item
    const useAppDispatch = useDispatch()

    const handleIncrement = () => {
        useAppDispatch(increment(id));
    }

    const handleDecrement = () => {
        useAppDispatch(decrement(id));
    }

    const handleRemoveFromCart = () => {
        useAppDispatch(removeFromCart(id));
    }

    const priceStyle = useMemo(() => formatCurrency(price), [price])
    const rate = useMemo(() => Math.ceil(rating.rate), [rating]);

  return (
      <div className=' mt-8 p-2 flex flex-col sm:flex-row w-full space-x-5 border-b-[1px] border-b-gray-300'>
          <Image
              src={image}
              alt='Cart Image'
              width={200}
              height={200}
              style={{
                  objectFit: 'contain',
                  cursor: 'pointer'
              }}
          />
          <div className=' flex flex-col justify-between flex-grow'>
              <div className=' flex flex-col space-y-3 mb-2'>
                <h1 className=' font-medium'>{title}</h1>
                <p className='text-green-500 text-xs'>in Stock</p>
                <div className="flex items-center">
                    <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                        className="ml-2 text-[11px] font-medium text-black"
                    >
                        This is a gift <span className=' text-blue-500 hover:text-red-500 hover:underline hover:underline-offset-1 cursor-pointer'>Learn more</span>
                    </label>
                </div>
              </div>
              <div className='flex mb-4'>
                  {
                      Array(rate).fill().map((_, index) => (
                          <AiFillStar key={index} className=' h-5 text-yellow-400' />
                      ))
                  }
              </div>
              <div className=' mb-3 flex justify-between items-center'>
                  <div className=' flex items-center space-x-2 border-[1px] border-gray-700'>
                      <div
                          onClick={handleDecrement}
                          className=' border-r-[1px] border-r-gray-700 p-3 text-red-600 cursor-pointer hover:bg-red-600 hover:text-white duration-500 ease-in-out '
                      >
                         <AiOutlineMinus /> 
                      </div>
                      <p>
                          {qty}
                    </p>
                      <div
                          onClick={handleIncrement}
                          className=' border-l-[1px] border-l-gray-700 p-3 text-green-600 cursor-pointer hover:bg-green-600  hover:text-white duration-500 ease-in-out'
                      >
                         <AiOutlinePlus /> 
                      </div>
                  </div>
                  <div onClick={handleRemoveFromCart}>
                      <TiDeleteOutline  className=' h-6 w-6 text-red-600 cursor-pointer hover:bg-red-600 hover:rounded-full duration-300 ease-in-out hover:text-white'/>
                  </div>
              </div>
          </div>

          <div className=' h-auto flex items-center'>
              <p className=' text-lg font-semibold'>{ priceStyle}</p>
          </div>
    </div>
  )
}

export default CartProduct