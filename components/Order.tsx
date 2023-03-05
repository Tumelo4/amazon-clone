import { Orderprops } from '@/pages/orders/orders'
import { formatCurrency } from '@/utilities/formatCurrency'
import moment from 'moment'
import Image from 'next/image'
import React, { useMemo } from 'react'

const Order = ({ id, amount, images, timestamp, items }: Orderprops) => {
    const date = useMemo(() => (
        moment.unix(timestamp).format("DD MM YYYY")
    ), [timestamp]) 

    const priceStyle = useMemo(() => formatCurrency(amount), [amount])
  return (
      <div className=' relative border rounded-md'>
          <div className=' flex items-center space-x-10 p-5 bg-gray-100 text-gray-600 '>
              <div>
                  <p className=' uppercase font-bold text-xs'>order placed</p>
                  <p>{ date }</p>
              </div>
              <div>
                  <p className=' uppercase text-xs font-bold'>total</p>
                  <p>{ priceStyle }</p>
              </div>

              <p className='text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500'>
                  {items.length} items
              </p>

              <p className=' absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap'>ORDER &#35; {id}</p>
          </div>
          <div className=' p-5 sm:p-10 '>
                  <div className='flex space-x-6 overflow-x-auto scrollbar-hide'>
                      {
                          images?.map((image, index) => (
                              <Image
                                  key={index}
                                  src={image}
                                  alt='Image'
                                  width={200}
                                  height={200}
                                  style={{
                                      objectFit: 'contain'
                                  }}
                                  className = 'h-20 sm:h-32'
                              />
                          ))
                      }
                  </div>
              </div>
    </div>
  )
}

export default Order