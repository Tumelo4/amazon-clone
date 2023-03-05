import { props } from '@/pages'
import React from 'react'
import Product from './Product'


const ProductFeed = ({products}: props) => {
  return (
    <div>
      {
        products && <div  className=' grid grid-flow-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-60 bg-gradient-to-t from-gray-300 to-gray-100'>
          {
            products.map(item => <Product key={item.id}  {...item} />)
          }
        </div> 
      }
    </div>
  )
}

export default ProductFeed