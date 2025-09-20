'use client'
import React, { useEffect } from 'react'
import { useData } from '../Contexts/DataStore'
import { useRouter } from 'next/navigation'

const layout = ( {children}) => {
    const isLoggedIn = useData(s=>s.isLoggedIn)
    
    const router = useRouter()

    useEffect(()=>{
        if(isLoggedIn){
            router.push('/')
        }
    },[isLoggedIn])
  return (
    <div>
        {children}
    </div>
  )
}

export default layout