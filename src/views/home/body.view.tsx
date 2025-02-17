import React from 'react'
import ItemLeft from '../../assets/images/unauth/item_left.png'
import ItemRight from '../../assets/images/unauth/item_right.png'
import Daily from '../../assets/images/unauth/daily_planning.png'
import Weekly from '../../assets/images/unauth/weekly_planning.png'
import Monthly from '../../assets/images/unauth/monthly_planning.png'
import { useNavigate } from 'react-router-dom'
interface HomeContent {
    title: string,
    img: string,
}

const Body: React.FC = () => {
    const ListHomeContent: HomeContent[] = [
        {
            title: "Daily Planning",
            img: Daily,
        },
        {
            title: "Weekly Planning",
            img: Weekly,
        },
        {
            title: "Monthly Planning",
            img: Monthly,
        },
    ]
    
    const navigate = useNavigate();

    const renderHomeContent = (Item: HomeContent) => {
        return (
            <div className="body-daily-planning">
                <div className="b-content-title">
                    <img className="b-content-title-img" src={ItemLeft} alt="item-left"/>
                    <p className="b-content-title-p">{Item.title}</p>
                    <img className="b-content-title-img" src={ItemRight} alt="item-right"/>
                </div>
                <div className="b-content-img">
                    <img className="b-content-main-img" src={Item.img} alt="main-img" />
                </div>
            </div> 
        )
    }

    return (
    <div className="home-body-content">
        <div className="body-top-content">
            <p className="b-t-title">Stay on track <br/> Zendo’s got your back!</p>
            <p className="b-t-subtitle">
                Unlock your full potential with simple, effective solutions for boosting concentration 
                and efficiency – all on just one platform!
            </p>
            <div className="b-t-btn-block">
                <button className="b-t-btn" onClick={() => navigate("/login")}>Discovery</button>
                <p style={{margin: "10px auto", color: "#0a8a0a"}}>Or</p>
                <button className="b-t-btn" onClick={() => navigate("/register")}>Try Now For Free !</button>
            </div>
        </div> 
        {ListHomeContent.map((item)=> renderHomeContent(item))}
    </div>
  )
}

export default Body