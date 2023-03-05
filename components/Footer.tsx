import React from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ScrollToTop from "react-scroll-to-top";
import Link from 'next/link';

const Footer = () => {
  return (
    <div className=' mt-5 w-full mx-auto flex flex-col'>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className=' py-3 text-white bg-amazon_blue-light hover:bg-opacity-90 duration-500 ease-in-out'>
        Back to top
      </button>
      <ScrollToTop
        smooth={true}
        className="fixed bottom-4 right-4 flex items-center justify-center"
        style={{zIndex: 999}}
      />
      {/* MD > Display */}
      <div className='hidden bg-amazon_blue md:flex space-x-32 justify-center py-10'>
        <div className='flex flex-col space-y-3'>
          <p className=' font-bold  text-base text-white'>Get to Know Us</p>
          <p className=' footer_hover_infor'>careers</p>
          <p className=' footer_hover_infor'>blog</p>
          <p className=' footer_hover_infor'>about amazon</p>
          <p className=' footer_hover_infor'>investor relations</p>
          <p className=' footer_hover_infor'>amazon devices</p>
          <p className=' footer_hover_infor'>amazon science</p>
        </div>

        <div className='flex flex-col space-y-3'>
          <p className=' font-bold text-base text-white'>Make Money with Us</p>
          <p className=' footer_hover_infor'>Sell products on Amazon</p>
          <p className=' footer_hover_infor'>Sell on Amazon Business</p>
          <p className=' footer_hover_infor'>Sell apps on Amazon</p>
          <p className=' footer_hover_infor'>Become an Affiliate</p>
          <p className=' footer_hover_infor'>Advertise Your Products</p>
          <p className=' footer_hover_infor'>Self-Publish with Us</p>
          <p className=' footer_hover_infor'>Host an Amazon Hub</p>
          <div className=' flex space-x-1 items-center'>
            <NavigateNextIcon className=' -mb-[1px] text-sm text-white' />
            <p className=' footer_hover_infor'>See More Make Money with Us</p>
          </div>
        </div>

        <div className='flex flex-col space-y-3'>
          <p className=' font-bold capitalize  text-base text-white'>amazon payment products</p>
          <p className=' footer_hover_infor'>Amazon Business Card</p>
          <p className=' footer_hover_infor'>Shop with Points</p>
          <p className=' footer_hover_infor'>Reload Your Balance</p>
          <p className=' footer_hover_infor'>Amazon Currency Converter</p>
        </div>

        <div className='flex flex-col space-y-3'>
          <p className=' font-bold capitalize  text-base text-white'>let us help you</p>
          <p className=' footer_hover_infor'>Amazon and COVID-19</p>
          <p className=' footer_hover_infor'>Your Account</p>
          <Link href='/orders/orders'>
            <p className=' footer_hover_infor'>Your Orders</p>
          </Link>
          <p className=' footer_hover_infor'>Shipping Rates & Policies</p>
          <p className=' footer_hover_infor'>Returns & Replacements</p>
          <p className=' footer_hover_infor'>Manage Your Content and Devices</p>
          <p className=' footer_hover_infor'>Amazon Assistant</p>
          <p className=' footer_hover_infor'>Help</p>
        </div>

      </div>

      {/* MD < Display */}
      
      <div className=' px-3 flex bg-amazon_blue md:hidden space-x-32 justify-center py-10'>
        <div className='flex flex-col space-y-3'>
          <p className=' footer_hover_infor'>Amazon.com</p>
          <p className=' footer_hover_infor'>You Lists</p>
          <p className=' footer_hover_infor'>Find a Gift</p>
          <p className=' footer_hover_infor'>Browsing history</p>
          <p className=' footer_hover_infor'>Returns</p>
        </div>

        <div className='flex flex-col space-y-3'>
          <Link href='/orders/orders'>
            <p className=' footer_hover_infor'>Your Orders</p>
          </Link>
          <p className=' footer_hover_infor'>Gift cards &#38; Registry</p>
          <p className=' footer_hover_infor'>Your Account</p>
          <p className=' footer_hover_infor'>Sell product on Amazon</p>
          <p className=' footer_hover_infor'>Your Recalls and Product Safety Alerts</p>
          <p className=' footer_hover_infor'>Customer Service</p>
        </div>
      </div>

      <div className=' bg-amazon_blue-light flex flex-col justify-center items-center space-y-2 py-5'>
        <div className=' flex items-center space-x-3'>
          <p className='footer_hover_infor text-xs'>Conditions of Use</p>
          <p className='footer_hover_infor text-xs'>Privacy Notice</p>
          <p className='footer_hover_infor text-xs'>Your Ads Privacy Choices</p>
        </div>
        <p className=' text-[10px] text-gray-200'>2023 amazon All rights resevered</p>
      </div>
    </div>
  )
}

export default Footer