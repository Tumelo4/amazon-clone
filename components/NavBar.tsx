import Image from 'next/image'
import React from 'react'
import logo from '@/public/logo.png'
import { Menu, Transition } from '@headlessui/react'
import { GoSearch } from 'react-icons/go'
import { AiOutlineMenu } from 'react-icons/ai'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { MdOutlineAddShoppingCart, MdOutlineArrowDropDown } from 'react-icons/md'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectorItems } from '@/redux/cartslice'


const NavBar = () => {

  const Items = useSelector(selectorItems);
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  const handle_sign_in_or_out = () => {
    if (session)
    {
      signOut();
    }
    else
    {
      signIn()
    }
  }
  return (
    <div className=' pt-2 flex justify-center bg-amazon_blue flex-col w-full'>
      {/* Top NavBar */}
      <div className=' px-3 flex mb-[9px] sm:justify-between items-center border-b-gray-700 border-b border-gray-400  md:border-0'>
        {/* Logo and deliver Location */}
        <div className=' flex items-center flex-shrink-0 flex-grow sm:flex-grow-0 md:flex-shrink '>
          {/* Logo */}
          <div className='md:hidden'>
            <AiOutlineMenu className=' h-8 w-8 cursor-pointer text-[#0f0d0e] hover:outline  hover:outline-1 hover:outline-white' />
          </div>
          <Link href='/'>
            <Image
              src={logo}
              alt='Log Image'
              width={150}
              height={40}
              style={{
                objectFit: 'fill',
              }}
              className=' flex-shrink-0 w-24 h-11 cursor-pointer hover:outline  hover:outline-1 hover:outline-white'
            />
          </Link>
          {/* Deliver Location */}
          <div className=' hover:outline hover:outline-offset-2 hover:outline-1'>

          </div>
        </div>

        {/* Search bar for Lagger devices */}
        {/* Unable to make parent `div` to receive outline when child `div` focus fix it later */}
        <div className=' mx-3 hidden h-10 flex-grow md:flex items-center '>
          {/* Drop down Menu  */}
          <Menu as="div" className="relative inline-block text-left h-full">
            <div className=' h-full'>
              <Menu.Button className="inline-flex h-full w-full justify-center rounded-l  bg-gray-200 px-4 py-[9px] text-sm font-medium text-[#181616bb] hover:bg-gray-300 duration-500 ease-in-out focus:outline-none">
                All
                <MdOutlineArrowDropDown
                  className="ml-2 -mr-1 h-5 w-5 text-[#181616bb]"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
          </Menu>

          {/* Search Input */}
          <input
            type="text"
            className='py-[7px] w-6 flex-grow flex-shrink px-2 h-full focus:outline-none'
            placeholder='Search Amazon'
          />
          {/* Search Icon */}
          <div className=' cursor-pointer h-full flex items-center bg-orange-400 hover:bg-orange-500 px-3 rounded-r'>
            <GoSearch />
          </div>

        </div>
        {/* Language, order, account and cart icon */}
        {/* Only for large device like Laptop */}
        <div className=' flex leading-tight text-white h-11 items-center '>
          {/* Language */}
          <div>

          </div>
          {/* Account */}
          {/* For Larg screen  */}
          <div onClick={handle_sign_in_or_out} className=' hidden whitespace-nowrap sm:flex flex-col justify-center p-2 cursor-pointer hover:outline  hover:outline-1 hover:outline-white'>
            {/* Greeting */}
            <p className=' text-[11px] font-medium'>
              {
                session ? (`Hello, ${session.user?.name}`) : "Hello, sign in"
              }
              
            </p>
            <div className=' flex gap-[2px] font-bold text-[13px]'>
              <p>Account &amp; List</p>
              <MdOutlineArrowDropDown className=' h-5 w-5' />
            </div>
          </div>
          {/* For small screen */}
          <div onClick={handle_sign_in_or_out} className=' sm:hidden whitespace-nowrap flex items-center p-2 cursor-pointer hover:outline  hover:outline-1 hover:outline-white'>
            <p className=' text-[11px] font-medium'>
              {
                session ? (`${session.user?.name}`) : 'Sign in'
              }
            </p>
            <NavigateNextIcon className=' text-[11px]' />
            <PersonOutlineIcon className=' -ml-1 h-8 w-8' />
          </div>
          {/* Orders */}
          <Link href = '/orders/orders'>
            <div className='hidden whitespace-nowrap sm:flex flex-col justify-center p-2 cursor-pointer hover:outline  hover:outline-1 hover:outline-white'>
              <p className=' text-[11px] font-medium'>
                Returns
              </p>
              <p className=' font-bold text-[13px]'>
                &amp; Orders
              </p>
            </div>
          </Link>
          {/* cart icon */}
          <Link href='/cart/checkout'>
            <div className=' relative flex items-center p-2 cursor-pointer hover:outline  hover:outline-1 hover:outline-white'>
              <MdOutlineAddShoppingCart className=' h-8 w-8' />
              <span className='absolute -top-[2px] -right-[2px] sm:right-7'>{ Items.total}</span>
              <p className='hidden sm:block -mb-3 font-bold text-base'>cart</p>
            </div>
          </Link>
        </div>

      </div>

      {/* search bar for smaller devices */}
      <div className='mb-2 px-3  md:hidden flex-grow items-center'>
        {/* Search Input */}
        <div className=' flex flex-grow h-10 items-center'>
          <input
            type="text"
            className=' rounded-l-[6px] text-white py-[7px] bg-[#0f0d0e] w-6 flex-grow flex-shrink pl-2 pr-3 h-full focus:outline-none'
            placeholder='Search Amazon'
          />
          {/* Search Icon */}
          <div className=' text-white cursor-pointer h-full flex items-center bg-orange-400 hover:bg-orange-500 px-3 rounded-[6px] -ml-1'>
            <GoSearch />
          </div>
        </div>
        {/* SMall device horizontal scrollable  Menu*/}
        <div className='p-1 mt-1 overflow-x-auto scrollbar-hide flex items-center'>
          <p className='  custom_outline_sm'>
            deals
          </p>

          <p className=' custom_outline_sm'>
            amazon basics
          </p>

          <p className=' custom_outline_sm'>
            best sellers
          </p>

          <p className=' custom_outline_sm '>
            video
          </p>

          <p className=' custom_outline_sm '>
            livestreams
          </p>

          <p className=' custom_outline_sm '>
            new releases
          </p>

          <p className=' custom_outline_sm '>
            home
          </p>

          <p className=' custom_outline_sm '>
            books
          </p>

          <p className=' custom_outline_sm '>
            deals
          </p>

          <p className=' custom_outline_sm'>
            gift cards
          </p>

          <p className='  custom_outline_sm'>
            pc
          </p>

          <p className='  custom_outline_sm'>
            health &amp; household
          </p>
          <p className='  custom_outline_sm'>
            music
          </p>
          <p className='  custom_outline_sm'>
            lists
          </p>
        </div>

      </div>
      {/* Bottom NavBar */}
      <div className=' items-center justify-between px-3 py-[2px] text-white gap-1 hidden md:flex  bg-amazon_blue-light'>
        <div className='flex items-center'>
          <div className=' p-2 cursor-pointer flex gap-[2px] items-center hover:outline  hover:outline-1 hover:outline-white '>
            <AiOutlineMenu className=' h-5 w-5 ' />
            <p className=' text-[13px] font-semibold'>All</p>
          </div>
          <p className='  custom_outline_md'>
            today&#39;s deals
          </p>
          <p className='  custom_outline_md'>
            customer service
          </p>
          <p className='  custom_outline_md'>
            registry 
          </p>
          <p className='  custom_outline_md'>
            gift cards
          </p>
          <p className=' custom_outline_md'>
            sell
          </p>
        </div>
        <p className=' custom_outline_md p-1 '>
            shop delas in electronic
        </p>
      </div>
    </div>
  )
}

export default NavBar