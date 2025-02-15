import Header from '@/views/home/header.view'
import Footer from '@/views/home/footer.view'
import Body from '@/views/home/body.view'
import Bg from '@/assets/images/unauth/bg-novasix-home.png'
import React from 'react'
import { Outlet } from 'react-router-dom'

const home: React.FC = () => {
  return (
    <div className="home-layout" style={{ backgroundImage: `url(${Bg})` }}>
        <Header />
        <Body />
        <Outlet/>
        <Footer />
    </div>
  )
}

export default home