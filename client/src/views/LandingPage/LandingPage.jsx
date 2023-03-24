import style from './LandingPage.module.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className={style.divLanding}> 
    {/* <div className={style.secondDivLanding}> */}
          <h1 className={style.h1Landing}>Henry Food</h1>
          <h3 className={style.h3Landing}>Enjoy...</h3>
          <img src={'https://media.tenor.com/DwcxAiPRKyEAAAAM/bear-hungry.gif'} alt="giffy" className={style.imgLanding} />
    {/* </div> */}
        <Link to='/home'><button className={style.buttonLanding}>Home</button></Link>
    </div>
  )
}
