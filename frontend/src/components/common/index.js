import React from 'react'
import HeaderComp from './Header';
import './style.css';
import Footer from './Footer';
const Layout = ({children}) => {
  return (
    <>
        <HeaderComp/>
        <main>{children}</main>
        <Footer/>

    </>
  )
}

export default Layout;