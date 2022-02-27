import React from 'react'
import Wrapper, { WrapperVariant } from './Wrapper'
import NavBar from './NavBar'


interface LayoutProps{
     varient?: WrapperVariant
}

const Layout: React.FC<LayoutProps> = ({children, varient}) => {
  return (
    <>
        <NavBar />
        <Wrapper varient={varient}>
            {children}
        </Wrapper>
    </>
  )
}

export default Layout