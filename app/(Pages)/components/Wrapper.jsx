'use client'
import LoadingPage from '@/app/Components/LoadingPage'
import { useData } from '@/app/Contexts/DataStore'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import SideBar from './SideBar'
import { useNavbar } from '@/app/Contexts/NavbarContext'
import Add from './Add'
import { useProjectInfo } from '@/app/Contexts/useProjectInfo'
import ProjectEdit from './ProjectEdit'

const Wrapper = ({ children }) => {

    const isLoggedIn = useData(s => s.isLoggedIn)

    const router = useRouter()

    const [Loading, setLoading] = useState(true)

    const isOpen = useNavbar(s=>s.isOpen)

    const isInfoOpen = useProjectInfo(s=>s.isOpen)

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/auth/login')
        } else {
            setLoading(false)
        }
    }, [isLoggedIn])

    if (Loading) return <LoadingPage />



    return (
        <div>
            <Navbar />
            <SideBar/>
            <div className={`pt-14 max-w-[100vw] overflow-clip  ${isOpen?"py-2 md:pl-[18.5rem]":"py-2 md:pl-[4.5rem]"} transition-all duration-500`}>
                {children}
                <Add/>
            </div>
            { isInfoOpen &&
                <ProjectEdit/>
            }
        </div>
    )
}

export default Wrapper