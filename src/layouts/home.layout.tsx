import Header from '@/views/home/header.view'
import Footer from '@/views/home/footer.view'
import React from 'react'
import { Outlet } from 'react-router-dom'

const home: React.FC = () => {
  return (
    <div>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default home