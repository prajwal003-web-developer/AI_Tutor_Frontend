import Image from 'next/image'
import React from 'react'

const LoadingPage = () => {
  return (
    <img src={'/Loading.gif'}  className='h-[100dvh] w-[100vw] object-center object-cover'></img>
  )
}

export default LoadingPage