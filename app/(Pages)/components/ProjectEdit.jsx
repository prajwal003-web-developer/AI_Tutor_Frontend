'use client'
import { useProjectInfo } from '@/app/Contexts/useProjectInfo'
import { Delete } from 'lucide-react'
import React from 'react'

const ProjectEdit = () => {
    const data = useProjectInfo(s=>s.data)
    const {Open ,Close} = useProjectInfo()
  return (
    <div onClick={()=>{
        Close()
    }} className='z-40 fixed inset-0 bg-[#000000a2] flex justify-center items-center p-8 backdrop-blur-sm'>
        <div onClick={(e)=>{e.stopPropagation()}} className='bg-black p-4 rounded w-full md:w-[30rem]'>
            <h3 className='mb-3 text-center font-semibold text-lg '>
                {data?.Title}
            </h3>
            <button onClick={data?.Pin} className='w-full p-3 cursor-pointer bg-[#0b0909] text-green-500  font-thin text-sm flex justify-center items-center'>
                Pin Project
            </button>
            <button onClick={data?.Delete} className='w-full p-3 cursor-pointer bg-[#0b0909] text-red-500 my-2 font-thin text-sm flex justify-center items-center'>
                Delete Project
            </button>
        </div>
    </div>

  )
}

export default ProjectEdit