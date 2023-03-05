import Image from 'next/image'
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'
import home from '@/public/home.png'
import toys from '@/public/toys.png'
import electronics from '@/public/electronics.png'
import beauty from '@/public/beauty.png'
import homeboy from '@/public/homeboy.png'

const HeroBanner = () => {
  return (
    <div className='relative'>
      <div className=' absolute bottom-0 z-20 bg-gradient-to-t from-gray-100 to-transparent'/>
        <Carousel
            autoPlay
            infiniteLoop
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            interval={5000}
        >
            <div>
              <Image
                src={home}   
                alt = "Image"
                width={10000}
                height={10000}
              /> 
            </div>
              
            <div className=' relative'>
              <Image
                src={electronics}   
                alt = "Image"
                width={10000}
                height={10000}
                />   
            </div>
        
            <div className=' relative'>
              <Image
                src={beauty}   
                alt = "Image"
                width={10000}
                height={10000}
                />   
            </div>
            
            <div className=' relative'>
              <Image
                src={toys}   
                alt = "Image"
                width={10000}
                height={10000}
                />   
            </div>
            <div className=' relative'>
              <Image
                src={homeboy}   
                alt = "Image"
                width={10000}
                height={10000}
                />   
            </div>
          
        </Carousel>
    </div>
  )
}

export default HeroBanner