import { ProductProps } from '@/pages'
import { formatCurrency } from '@/utilities/formatCurrency' // lightweight solution or you can use react-currency-formatter
import Image from 'next/image'
import React, { useMemo } from 'react'
import { AiFillStar } from 'react-icons/ai'
import Prime from '@/public/Prime.png'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/redux/cartslice'

const Product = (item: ProductProps) => {
    const useAppDispatch = useDispatch()
    const { id, title, price, description, category, image, rating } = item
    const rate = useMemo(() => Math.ceil(rating.rate), [rating]);
    const priceStyle = useMemo(() => formatCurrency(price), [price])
    
    const handleAddToCart = () => {
        useAppDispatch(addToCart({item, qty: 1}))
    }
    
  return (
    <div className=' relative flex flex-col m-5 bg-white z-30 p-10'>
        
        <div className='flex justify-center'>
            <Image
                src={image}
                alt= 'Product Image'
                height={200}
                width={200}
                style={{
                    objectFit: 'contain',
                    height: 'auto',
                    width: 'auto'
                }}
                className='transition-transform duration-300 transform hover:scale-110 '
            />
        </div>
        <h4 className=' my-3'>{title}</h4>
        <p className=' absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>
       
        <div className='flex'>
            {
            Array(rate).fill().map((_, index) => (
                <AiFillStar key = {index} className=' h-5 text-yellow-400' />
            ))
            }
        </div>
        
        <p className=' text-xs my-2 line-clamp-2'>{description}</p>
        <p className='mb-5'>{priceStyle}</p>
        
        
        <button
            onClick={handleAddToCart}
            type='button'
            className=' mt-auto p-2 text-xs md:text-sm bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-sm border-yellow-300 focus:ring-2 focus:ring-yellow-500 active:from-yellow-500  focus:outline-none'
        >
            Add to Cart
        </button> 
    </div>
  )
}

export default Product