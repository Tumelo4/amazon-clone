import Image from 'next/image'
import React, { useState } from 'react'
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
import { Fragment } from 'react'
import Drawer from '@mui/material/Drawer';
import SmallDevMenu from './SmallDevMenu'
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Use create theme to remove default background of mui drawer component
const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});

const NavBar = () => {

  const Items = useSelector(selectorItems);
  const { data: session } = useSession()
  // usestate from drawer
  const [isopen, setIsopen] = useState<boolean>(false)
  const dropDownMenu = [
    'all departments', 'art & crafs', 'automotive', 'baby', 'beauty & personal care', 'books', 'boys\' fashion',
    'computers', 'deals', 'digital music', 'electronics', 'girls\' fashion', 'health & houseold', 'industrial & scientific', 'kindle store', 'luggage',
    'men\'s fashion', 'movies & TV', 'music, cDs & vinyl', 'pet supplies', 'prime video', 'software', 'sports & outdoors', 'tools & home improvement',
    'toys & games', 'video games', 'women\'s fashion'
  ]

  const sec_small_dev_menu = [
    'deals', 'amazon basics', 'best sellers', 'video', 'livestreams',
    'new releases', 'home', 'books', 'gift cards', 'pc', 'health & household', 'music', 'lists'
  ]

  const b_NavBar = [
    'today\' deals', 'customer service', 'registry', 'gift cards', 'sell'
  ]
  

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

  // handle closing of drawer
  const handle_open_close = () => {
    setIsopen(prev => prev === true? false : true)
  }

  return (
    <div className=' pt-2 flex justify-center bg-amazon_blue flex-col w-full'>
      {/* Top NavBar */}
      <div className=' px-3 flex mb-[9px] sm:justify-between items-center border-b-gray-700 border-b border-gray-400  md:border-0'>
        {/* Logo and deliver Location */}
        <div className=' flex items-center flex-shrink-0 flex-grow sm:flex-grow-0 md:flex-shrink '>
          {/* Drawer for small device */}
          <div className='md:hidden'>
            <AiOutlineMenu onClick={handle_open_close} className=' h-8 w-8 cursor-pointer text-gray-100 hover:outline  hover:outline-1 hover:outline-white' />
            <ThemeProvider theme={theme}>
              <Drawer anchor="left" open={isopen} onClose={handle_open_close}>
                <SmallDevMenu  session={session} handle_sign_in_or_out={handle_sign_in_or_out} handle_open_close={handle_open_close} />
              </Drawer>
            </ThemeProvider>
          </div>
          {/* Logo */}
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
              
              {/* Use the `Transition` component. */}
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute z-50 w-auto h-96 overflow-y-auto left-0 -mt-[4px] ml-[2px] border-[1px] border-gray-400 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-2">
                    {
                      dropDownMenu.map((infor, index) => (
                        <Menu.Item key={index}>
                          {({ active }) => (
                            <button
                              
                              className={`${
                                active ? 'bg-blue-500 text-white' : 'text-gray-900'
                              } group flex w-full capitalize whitespace-nowrap items-center px-2 py-2 text-sm`}
                            >
                              {infor}
                            </button>
                          )}
                        </Menu.Item>
                      ))
                    }
                  </div>
                </Menu.Items>
              </Transition>
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
              <span className='absolute -top-[2px] -right-[2px] sm:right-7 text-orange-500'>{ Items.total}</span>
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
        {/* Small device horizontal scrollable  Menu*/}
        <div className='p-1 mt-1 overflow-x-auto scrollbar-hide flex items-center'>
          {
            sec_small_dev_menu.map((infor, index) => (
              <p key={index} className='  custom_outline_sm'>
                {infor}
              </p>
            ))
          }
        </div>

      </div>
      {/* Bottom NavBar */}
      <div className=' items-center justify-between px-3 py-[2px] text-white gap-1 hidden md:flex  bg-amazon_blue-light'>
        <div className='flex items-center'>
          <div className=' p-2 cursor-pointer flex gap-[2px] items-center hover:outline  hover:outline-1 hover:outline-white '>
            <AiOutlineMenu className=' h-5 w-5 ' />
            <p className=' text-[13px] font-semibold'>All</p>
          </div>
          {
            b_NavBar.map((infor, index) => (
              <p key={index} className='  custom_outline_md'>
                {infor}
              </p>
            ))
          }
        </div>
        <p className=' custom_outline_md p-1 '>
            shop delas in electronic
        </p>
      </div>
    </div>
  )
}

export default NavBar
