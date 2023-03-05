import type { GetServerSideProps } from 'next'
import HeroBanner from '@/components/HeroBanner'
import ProductFeed from '@/components/ProductFeed'
import React from 'react'
import { getSession } from 'next-auth/react'

export interface ProductProps {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: {
    rate: number,
    count: number
  }
}

export interface props {
  products: ProductProps[]
}

const Home = ({products}: props) => {
  return (
    <div>
      {/* Hero Banner */}
      <HeroBanner />
      {/* ProductFeed */}
      <ProductFeed products={products} />
      {/* Footer Bannere */}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const products = await fetch('https://fakestoreapi.com/products').then(res => res.json());
  return { props: { products } };
}

export default Home