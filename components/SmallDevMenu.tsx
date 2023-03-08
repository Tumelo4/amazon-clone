import { Session } from 'next-auth'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import React from 'react'
import { MdOutlineArrowDropDown, MdOutlineHome } from 'react-icons/md';
import Link from 'next/link';
import { Menu } from '@headlessui/react'

interface SmallDevMenuProps {
  session: Session | null,
  handle_sign_in_or_out: () => void,
  handle_open_close: () => void
}

const partTopDepartment = [
  'home', 'health & household', 'books'
]

const seeAll = [
  'Amazon music', 'prime video', 'books', 'echo & alexa', 'fire tablets', 'fire TV', 'kindle',
  'audible books & originals', 'clothing, shoes, jewelry & watches', 'electronics', 'office & school supplies',
  'gift cards', 'amazon appstore', 'movies, music & games', 'computers', 'home, garden & pets', 'handmade', 'beauty, health & personal care',
  'food & grocery', 'toys, kids & baby', 'sports', 'outdoors', 'automotive & industrial', 'home services', 'Amazon subscription boxes',
  'shop by interest', 'amazon business', 'amazon custom', 'amazon discover', 'amazon live', 'amazon music', 'amazon outlet', 'amazon pharmacy',
  'RxPass from Amazon pharmacy', 'clinic', 'amazon physical stores', 'amazon trade-in', 'amazon second chane', 'amazon warehouse', 'audible', 'baby registry',
  'climate pledge friendly', 'credit & payment products', 'customers\' most-loved styles', 'your essential', 'find a gift', 'luxury stores', 'our brands',
  'pet profile', 'prime', 'amazon photos', 'prime video', 'sell products on amazon', 'subscribe & save', 'the drop', 'wedding registry'
]

const SmallDevMenu = ({ session, handle_sign_in_or_out, handle_open_close }: SmallDevMenuProps) => {
  return (
    <div className=' w-screen h-screen opacity-100 flex'>
      <div className=' overflow-y-auto flex flex-grow-0 flex-shrink-0 w-[85%] flex-col bg-white'>
        {/* Top Information */}
        <div className=' bg-amazon_blue-light p-3 text-white'>
          <div className='  sm:hidden whitespace-nowrap flex justify-end items-center p-2  hover:outline  hover:outline-1 hover:outline-white'>
            <p className=' text-[11px] font-medium'>
              {
                session ? (`${session.user?.name}`) : 'Sign in'
              }
            </p>
            <NavigateNextIcon className=' text-[11px]' />
            <PersonOutlineIcon onClick={handle_sign_in_or_out} className='cursor-pointer -ml-1 h-8 w-8' />
          </div>

          <div className=' pt-2 pl-[5px] text-[1.125rem] font-semibold'>
            <Link href='/'>
              <p>Browse</p>
              <p className=' -mt-2'>Amazon</p>
            </Link>
          </div>
          
        </div>

        {/* Second Informatio Link to home*/}
        <Link href='/'>
          <div className=' flex justify-between items-center py-3 px-4 border-b-4 border-b-gray-400 cursor-pointer '>
            <p className=' capitalize text-base font-semibold text-black'>amazon home</p>
            <MdOutlineHome className='-ml-1 h-6 w-6'/>
          </div>
        </Link>

        <div className=' py-3 px-4 border-b-4 border-b-gray-400 space-y-7 text-black'>
          <p className=' capitalize text-base font-semibold text-black'>trending</p>
          <p className=' capitalize text-base'>movers & shakes</p>
        </div>

        <div className=' py-3 px-4 space-y-7 text-black'>
          <p className=' capitalize text-base font-semibold text-black'>trending</p>
          {
            partTopDepartment.map((value, index) => (
              <p key={index} className=' capitalize text-base'>{value}</p>
            ))
          }

          {/* Drop down menu */}

          <Menu>
            <Menu.Button className='flex items-center gap-1 pb-3'>
              See All
              <MdOutlineArrowDropDown
                className="ml-2 -mr-1 h-5 w-5 text-[#181616bb]"
                aria-hidden="true"
              />
            </Menu.Button>
            <Menu.Items className='space-y-7'>
              {
                seeAll.map((value, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <button
                                    
                        className={`${
                          active ? 'bg-blue-500 text-white' : 'text-gray-900'
                        } group flex w-full capitalize whitespace-nowrap items-center px-2 py-2 text-sm`}
                      >
                        {value}
                      </button>
                    )}
                  </Menu.Item>
                ))
              }
              

            </Menu.Items>
          </Menu>
          
        </div>
        
      </div>
      <div onClick={handle_open_close} className=' cursor-pointer flex-1 opacity-100 text-white flex pt-8 justify-center'>
        <p className=' text-3xl font-[200]'>x</p>
      </div>
    </div>
  )
}

export default SmallDevMenu
