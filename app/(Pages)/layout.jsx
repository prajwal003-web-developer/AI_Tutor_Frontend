'use client'
import React from 'react'
import Wrapper from './components/Wrapper'

const layout = ({children}) => {
  return (
    <div>
       <Wrapper>
         {children}
       </Wrapper>
    </div>
  )
}

export default layout