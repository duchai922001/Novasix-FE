import React from 'react'
import LoginImg from "@/assets/images/unauth/Login.png"
import DailyImg from "@/assets/images/unauth/MainDaily.png"
import Monthly from "@/assets/images/unauth/Monthly.png"
import Package from "@/assets/images/unauth/Package.png"
import Weekly from "@/assets/images/unauth/Weekly.png"
import Dashboard from "@/assets/images/unauth/Dashboard.png"
import MainFunc from "@/assets/images/unauth/MainFunction.png"
import Mission from "@/assets/images/unauth/Mission.png"
const Guideline:React.FC = () => {
  return (
    <div className="guideline-container">
    <h1 className="guideline-title">Hướng Dẫn Sử Dụng Zendo</h1>
    <div className="guideline-gallery">
      <div className="guideline-item">
        <img src={LoginImg} alt="Bước 1" />
        <p>Đăng nhập tài khoản Zendo để bắt đầu sử dụng.</p>
      </div>
      <div className="guideline-item">
        <img src={MainFunc} alt="Bước 2" />
        <p>Khám phá các tính năng chính và giao diện.</p>
      </div>
      <div className="guideline-item">
        <img src={DailyImg} alt="Bước 3" />
        <p>Thêm Daily Task của bạn và đừng quên sử dụng Pomodoro nhé</p>
      </div>
      <div className="guideline-item">
        <img src={Package} alt="Bước 4" />
        <p>Nâng cao trải nghiệm cùng các gói tính năng hấp dẫn!</p>
      </div>
      <div className="guideline-item">
        <img src={Weekly} alt="Bước 5" />
        <p>Mở khóa giao diện quản lí Weekly nè</p>
      </div>
      <div className="guideline-item">
        <img src={Monthly} alt="Bước 6" />
        <p>Mở khóa giao diện quản lí Monthly luôn nhé các tình yêu!</p>
      </div>
      <div className="guideline-item">
        <img src={Dashboard} alt="Bước 7" />
        <p>Quản lí số lượng Task cũng như hiệu suát công việc qua DashBoard</p>
      </div>
      <div className="guideline-item">
        <img src={Mission} alt="Bước 8" />
        <p>Đừng quên làm nhiệm vụ hằng ngày để được nhiều phần thưởng hấp dẫn nha</p>
      </div>
    </div>
  </div>
  )
}

export default Guideline