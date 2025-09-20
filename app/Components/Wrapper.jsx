'use client'
import LoadingPage from '@/app/Components/LoadingPage'
import { useData } from '@/app/Contexts/DataStore'
import api from '@/app/utils/axios'
import React, { useEffect, useState } from 'react'

const Wrapper = ({ children }) => {


    const [Loading, setLoading] = useState(true)

    const { setData, setProjects, setLoggedIn } = useData()



    useEffect(() => {
        api.get('auth/me')
            .then(res => {
                const data = res.data
                setData(data.user)
                setProjects(data.Projects)

                console.log(data.Projects)

                setLoggedIn(true)
                setLoading(false)
            })
            .catch(() => {
                setLoggedIn(false)
                setLoading(false)
            }).finally(() => {
                setLoading(false)
            })

    }, [])

    if (Loading) return <LoadingPage />
    return (
        <div>
            {children}
        </div>
    )
}

export default Wrapper