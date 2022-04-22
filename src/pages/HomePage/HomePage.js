import './HomePage.css'
import '../Pages.css'
import { IoMdNotificationsOutline } from 'react-icons/io'

import { useEffect, useState } from "react"
import Loader from "../../components/Loader/Loader"
import { useNavigate } from 'react-router-dom'

import { signOutUser, getUserAvatar, getUserDescription } from "../../API/UserAPI"

const HomePage = () => {

    const navigate = useNavigate()

    const navToYourAccountPage = () => {
        navigate('/your_account')
    }

    const navToRankingPage = () => {
        navigate('/ranking')
    }

    const navToSearchingUsersPage = () => {
        navigate('/searching_users')
    }

    const navToYourPartnersPage = () => {
        navigate('/your_partners')
    }

    return(
            <div id="home-page-container">
                <div id="home-page-header-container">
                    <h2>Welcome in SetUpYourBussiness</h2>
                    <h3>What you want to do next?</h3>
                </div>
                <div id="home-page-buttons-container">
                    <button className='home-page-button' onClick={navToYourPartnersPage}>
                        <div className='img-container'>
                            <img src={process.env.PUBLIC_URL + '/Logo_3.png'} alt="Logo_3.png" className="img-button" />
                        </div>
                        
                        <p>Your Partners</p>
                    </button>
                    <button className='home-page-button' onClick={navToSearchingUsersPage}>
                        <div className='img-container'>
                            <img src={process.env.PUBLIC_URL + '/Searching_3.png'} alt="Searching_3.png" className="img-button" />
                        </div>
                        
                        <p>Get Partners</p>
                    </button>
                    <button className='home-page-button' onClick={navToRankingPage}>
                        <div className='img-container'>
                            <img src={process.env.PUBLIC_URL + '/Ranking_3.png'} alt="Ranking_3.png" className="img-button" />
                        </div>
                        
                        <p>Ranking</p>
                    </button>
                    <button className='home-page-button' onClick={navToYourAccountPage}>
                        <div className='img-container'>
                            <img src={process.env.PUBLIC_URL + '/Person_3.png'} alt="Person_3.png" className="img-button" />
                        </div>
                        
                        <p>Your Account</p>
                    </button>
                    <button className='home-page-button'>
                        <div className='img-container'>
                            <img src={process.env.PUBLIC_URL + '/Offers_3.png'} alt="Offers_3.png" className="img-button" />
                        </div>
                        
                        <p>Offers</p>
                    </button>
                    <button className='home-page-button'>
                        <div className='img-container'>
                            <img src={process.env.PUBLIC_URL + '/Contracts_3.png'} alt="Contracts_3.png" className="img-button" />
                        </div>
                        
                        <p>Your Contracts</p>
                    </button>
                </div>
            </div>
    )
}

export default HomePage