'use client'
import React from 'react'
import { useDialogStore } from '../Contexts/DialogStore'

const Dialog = () => {
    const isOpen = useDialogStore(s=>s.isOpen)
    const Accept = useDialogStore(s=>s.Accept)
    const Message = useDialogStore(s=>s.Message)

    const{Close ,Open} = useDialogStore()
  return (
    <div onClick={Close} className={` ${isOpen?"flex justify-center items-center":'hidden'} fixed inset-0 z-50 bg-[#00000028] backdrop-blur-sm  p-3`}>
        <div onClick={(e)=>{
            e.stopPropagation()
        }} className='rounded shadow-xl p-8 w-full md:w-[30rem] bg-black'>
            <h2 className='text-gray-200 font-semibold text-[1rem]'>
                {Message}
            </h2>
            <div className='my-2 flex justify-end gap-3 text-xs'>
                <button className='p-1 px-4 rounded cursor-pointer bg-gray-300 hover:bg-gray-400 text-black' onClick={Close} >Close</button>
                <button className='p-1 px-4 rounded cursor-pointer bg-gray-900 hover:bg-gray-800' onClick={Accept}>Accept</button>
            </div>
        </div>
    </div>
  )
}

export default Dialog