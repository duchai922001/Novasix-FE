import React from 'react'

const pomodoroPage: React.FC = () => {
  return (
    <div className="pomodoro-page-container">
        <div className="pomodoro-title-block">
            <p className="pomodoro-title">Làm bài tập về nhà siêu cấp vip pro </p>
            <p className="pomodoro-tag">Importance_Urgency</p>
        </div>

        <div className="pomodoro-time-block">
            <div className="p-t-quantity">
                <div className="p-t-quantity-item">
                    🍅
                </div>
                <div className="p-t-quantity-item">
                    🍅
                </div>
            </div>
            <div className="p-t-countDown">
                25:00
            </div>
            <div className="p-t-c-button-block">
                <button className="p-t-button">
                    back
                </button>
                <button className="p-t-button">
                    skip
                </button>
            </div>
        </div>

        <div className="pomodoro-description">
            <p className="pomodoro-description-p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat voluptates voluptas doloremque molestias tenetur accusamus ipsa rem architecto odio nulla magnam distinctio minima recusandae, vitae saepe non libero ut. Nesciunt!</p>
        </div>
    </div>
  )
}

export default pomodoroPage