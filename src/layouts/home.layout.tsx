import Header from '@/views/home/header.view'
import Footer from '@/views/home/footer.view'
import React from 'react'
import { Outlet } from 'react-router-dom'
import MBtnBackToTop from '@/components/m-btn-backtotop'

const home: React.FC = () => {
  return (
    <div className="home-layout">
        <Header />
        <Outlet/>
        <Footer />
        <MBtnBackToTop />
    </div>
  )
}

export default home