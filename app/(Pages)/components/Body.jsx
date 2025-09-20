'use client'
import React from 'react'
import ChatDiv from './ChatDiv'
import { Plus } from 'lucide-react'
import { useAddStore } from '@/app/Contexts/AddStore'

import { useData } from '@/app/Contexts/DataStore'
import { useRouter } from 'next/navigation'



const Body = () => {

  const { OpenAdd } = useAddStore()

  const projects = useData(s => s.Projects)

  return (
    <div className='p-2 flex  h-[85vh] items-end'>
      <div className='w-full'>
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2 md:space-y-3">
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent">
            START LEARNING
          </h1>
          <b onClick={OpenAdd} className="text-4xl cursor-pointer md:text-6xl font-extrabold tracking-wide bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            ADD
          </b>
          <p className="text-sm md:text-lg text-gray-600 font-medium">
            FILE, AND START ASKING TO AI
          </p>
          <p className="text-xs md:text-base text-gray-500 tracking-wide">
            LEARN SMART, LEARN FAST
          </p>
        </div>

        <div className='flex-1 border-b border-t w-full my-2   border-solid border-gray-800 flex flex-wrap gap-3  py-2 '>
          {
            projects.slice(0, 6)?.map((itm, idx) => <MyProjectCard key={idx} Name={itm?.Name} Description={itm?.Description} id={itm?._id} />)
          }
        </div>
        <div onClick={OpenAdd} className='p-6 rounded bg-[#ffffff0b] flex justify-center gap-1 items-center w-full cursor-pointer select-none'>
          ADD NEW CHAT <Plus />
        </div>
      </div>
    </div>
  )
}

export default Body



const MyProjectCard = ({ Name, Description, id }) => {
  const router = useRouter()
  return (
    <div onClick={()=>{
      router.push(`/${id}`)
    }} className='bg-[#090909] cursor-pointer p-3 rounded min-w-[13rem] md:min-w-[25rem] flex-1'>
      <h3 className='text-lg font-semibold text-gray-300'>
        {
          Name
        }
      </h3>
      <p className='font-light text-sm '>
        {Description}
      </p>
    </div>
  )
}