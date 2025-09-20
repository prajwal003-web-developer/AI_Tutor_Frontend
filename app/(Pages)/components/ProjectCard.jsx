'use client'
import { useData } from '@/app/Contexts/DataStore'
import { useNavbar } from '@/app/Contexts/NavbarContext'
import { useProjectInfo } from '@/app/Contexts/useProjectInfo'
import api from '@/app/utils/axios'
import { EllipsisVertical, PinIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

const ProjectCard = ({ id, Name, Description, isPinned }) => {

  const { setOpen } = useNavbar()

  const { Open, Close } = useProjectInfo()

  const router = useRouter()

  const setProjects = useData(s=>s.setProjects)


  const deleteProject = async () => {
    try {
      await api.delete(`project/${id}`)
      toast.success('SuccessFully Deleted')
      location.href = '/'
      Close()
    } catch (error) {
      toast.error("Failed To Delete")
    }
  }

  const PinProject = async () => {
    try {
      const res = await api.put(`project/${id}/pin?pin=true`)

      const data = res.data

      setProjects(data.projects)
      toast.success('SuccessFully Pinned')
      Close()
    } catch (error) {
      toast.error("Failed To Delete")
    }
  }

  const UnPin = async () => {
    try {
      const res = await api.put(`project/${id}/pin?pin=false`)

      const data = res.data

      setProjects(data.projects)
      toast.success('SuccessFully UnPinned')
      Close()
    } catch (error) {
      toast.error("Failed To Delete")
    }
  }
  return (
    <div onClick={() => {
      router.push(`/${id}`)
      setOpen(false)
    }} className='rounded bg-[#ffffff15] p-2 cursor-pointer  overflow-clip'>
      <div className='flex justify-between items-center '>
        <h3 className='text-gray-200 font-semibold text-sm overflow-clip text-nowrap flex-1'>
          {Name.slice(0, 25)}
        </h3>
        <div onClick={(e) => {
          e.stopPropagation()
        }} className='flex justify-center items-center gap-1'>
          {
            isPinned &&
            <button onClick={UnPin} className='cursor-pointer'>
              <PinIcon size={16} />
            </button >
          }
          <button onClick={() => {
            Open({ Title: `Info For ${Name}`, Delete: deleteProject, Pin: PinProject })
          }} className='cursor-pointer'>
            <EllipsisVertical size={16} />
          </button>
        </div>
      </div>
      <p className='py-1 text-xs text-gray-300 overflow-clip text-nowrap'>
        {Description.slice(0, 60)}
      </p>
    </div>
  )
}

export default ProjectCard