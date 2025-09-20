'use client'

import { useAddStore } from '@/app/Contexts/AddStore'
import { useData } from '@/app/Contexts/DataStore'
import { useDialogStore } from '@/app/Contexts/DialogStore'
import { useNavbar } from '@/app/Contexts/NavbarContext'
import { LogOut, MoveLeft, MoveRight, Plus } from 'lucide-react'
import React from 'react'
import ProjectCard from './ProjectCard'

const SideBar = () => {

    const isOpen = useNavbar(s => s.isOpen)
    const { setOpen } = useNavbar()

    const {Open,Close} = useDialogStore()

        const {OpenAdd , setLoading}= useAddStore()
        const Loading = useAddStore(s=>s.Loading)
        const isOpenAdd  = useAddStore(s=>s.isOpen)

        const projects = useData(s=>s.Projects)

    const HandleLogout = ()=>{
        const logout = ()=>{
            localStorage.removeItem('token')
            location.reload()
            Close()
        }
        Open(logout, "Do You Want To Logout?")
    }
    return (
        <div className='relative'>
            <div className={`fixed shadow-xl  bottom-0 left-0 top-14 bg-[#0d0c0c]  z-30 transition-all duration-500  ${isOpen ? "w-[18rem] rounded" : "hidden md:block md:w-[4rem]"} group `}>
                <div className='h-full w-full flex justify-center items-center flex-col py-3 p-2'>
                    <button onClick={OpenAdd} className='w-full overflow-clip text-nowrap p-2 bg-[#0a0909] font-semibold text-sm text-gray-300 gap-1 rounded cursor-pointer flex justify-center items-center'>

                        <Plus />
                        <span className={` ${isOpen ? "block" : "hidden"}`}>
                            Add New
                        </span>
                    </button>
                    {/* All Chats  */}
                    <div className='flex-1 border-b border-t w-full my-2 overflow-scroll border-solid border-gray-800 flex flex-col gap-3 noScrollBar py-2'>
                       {isOpen &&
                        projects?.map((itm,idx)=><ProjectCard isPinned={itm?.IsPinned} key={idx} Name={itm?.Name} Description={itm?.Description} id={itm?._id}/>)
                       }
                    </div>

                    <button onClick={HandleLogout} className='w-full overflow-clip text-nowrap p-2 bg-[#ffffff16] font-semibold text-sm text-gray-300 gap-1 rounded cursor-pointer flex justify-center items-center'>

                        <LogOut />
                        <span className={` ${isOpen ? "block" : "hidden"}`}>
                            Logout
                        </span>
                    </button>
                </div>



                <button
                    className='hidden md:group-hover:block rounded-full p-2 bg-gray-800 cursor-pointer absolute top-2 -right-2'
                    onClick={() => {
                        setOpen(!isOpen)
                    }}>
                    {
                        isOpen ? <MoveLeft size={16} /> : <MoveRight size={16} />
                    }
                </button>
            </div>
        </div>
    )
}

export default SideBar