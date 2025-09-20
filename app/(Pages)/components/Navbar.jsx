'use client'
import { useNavbar } from '@/app/Contexts/NavbarContext'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {

  const isOpen = useNavbar(s => s.isOpen)
  const { setOpen } = useNavbar()

  const HandleClick = () => {
    setOpen(!isOpen)
  }
  return (
    <div className='border-b-2 border-solid border-gray-900 z-30 bg-black p-3 fixed top-0 left-0 right-0 flex justify-between items-center'>
      <Link href={'/'} className='text-lg select-none cursor-pointer  md:text-xl bg-gradient-to-l from-gray-300 to-pink-400 via-blue-600 bg-clip-text text-transparent'>
        MY_TUTOR
      </Link>
      <button className='md:hidden block' onClick={HandleClick}>
        <Menu />
      </button>
    </div>
  )
}

export default Navbar