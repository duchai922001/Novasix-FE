import React from 'react'

const Body: React.FC = () => {
  return (
    <body className="view txs">
     <div className="hero-section">
        <h1 className="hero-title">Stay on track <br/> Zendo’s got your back!</h1>
        <p className="hero-subtitle">
            Unlock your full potential with simple, effective solutions for boosting concentration 
            and efficiency – all on just one platform!
        </p>
        <div className="hero-buttons">
            <button className="hero-button">Discovery</button>
            <p className="hero-or">Or</p>
            <button className="hero-button">Try Now For Free !</button>
        </div>
    </div> 
    <div className="container">
        <h2>Daily Planning</h2>
        <div className="planning-section">
            <div className="image-grid">
                <img src="daily1.jpg" alt="Daily 1"/>
            </div>
        </div>

        <h2>Weekly Planning</h2>
        <div className="planning-section">
            <div className="image-grid">
                <img src="weekly1.jpg" alt="Weekly 1"/>

            </div>
        </div>
    </div>
</body>
  )
}

export default Body