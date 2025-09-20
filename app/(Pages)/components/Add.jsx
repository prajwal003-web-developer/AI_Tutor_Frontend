'use client'
import { useAddStore } from '@/app/Contexts/AddStore'
import { useData } from '@/app/Contexts/DataStore'
import api from '@/app/utils/axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Add = () => {
    const { OpenAdd, CloseAdd: Close } = useAddStore()
    const Loading = useAddStore(s => s.Loading)
    const isOpen = useAddStore(s => s.isOpen)
    const setLoading = useAddStore(s => s.setLoading)

    const projects = useData(a=>a.Projects)
    const setprojects = useData(a=>a.setProjects)

    const router = useRouter()

    const [data, setData] = useState({
        Name: '',
        Description: '',
        file: null
    })

    const HandleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const HandleFile = (e) => {
        const file = e.target.files[0]
        if (file) {
            const allowed = ['application/pdf',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'text/plain']
            if (!allowed.includes(file.type)) {
                toast.error("Only PDF, DOCX, or TXT files are allowed!")
                return
            }
            setData({
                ...data,
                file
            })
        }
    }

    const HandleSubmit = async () => {
        if (!data.Name || !data.Description || !data.file) {
            toast.error("All fields including file are required!")
            return
        }

        if (Loading) {
            return
        }

        const formData = new FormData()
        formData.append('Name', data.Name)
        formData.append('Description', data.Description)
        formData.append('file', data.file)

        try {
            setLoading(true)
            const res = await api.post('/project', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            toast.success("Item added successfully!")
            const data = res.data

            setprojects([...projects ,data.project])

            router.push(`/${data.project._id}`)




        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to add item")
            console.log(err)
            setLoading(false)
        } finally {
            setLoading(false)
            Close()
        }
    }

    return (
        <div
            onClick={Close}
            className={` ${isOpen ? "flex justify-center items-center" : 'hidden'} fixed inset-0 z-50 bg-[#00000061] backdrop-blur-sm  p-3`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className='rounded shadow-xl p-3 w-full md:w-[30rem] bg-[#0c0c0c] pb-8'
            >
                <h2 className='text-lg font-semibold text-center my-3'>
                    ADD ITEMS
                </h2>

                <input
                    type="text"
                    name='Name'
                    placeholder='Enter Name'
                    value={data.Name}
                    onChange={HandleChange}
                    className='outline-none border border-solid border-gray-900 rounded p-2 w-full bg-[#ffffff0e] mb-2'
                />

                <textarea
                    name='Description'
                    placeholder='Enter Short Description'
                    value={data.Description}
                    onChange={HandleChange}
                    className='outline-none border border-solid border-gray-900 rounded p-2 w-full bg-[#ffffff0e] mb-2 resize-none'
                />

                <label
                    htmlFor="File"
                    className='mb-2 p-2 cursor-pointer text-center bg-[#ffffff0e] border border-solid border-gray-900 rounded block'
                >
                    {data.file ? data.file.name : "Add File"}
                </label>
                <input
                    id='File'
                    className='hidden'
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={HandleFile}
                />

                <button
                    onClick={HandleSubmit}
                    disabled={Loading}
                    className='mt-3 w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 disabled:opacity-50'
                >
                    {Loading ? "Uploading..." : "Submit"}
                </button>
            </div>
        </div>
    )
}

export default Add
