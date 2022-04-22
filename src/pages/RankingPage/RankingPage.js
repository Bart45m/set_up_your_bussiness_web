import './RankingPage.css'
import { useEffect, useState } from 'react'
import { getUsersListing, mapFiltersValuesToConditions } from '../../API/UserAPI'
import { listItemUserConverter } from '../../utils/ListItem'
import ListView from '../../components/ListView/ListView'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'

import { useDispatch, useSelector } from "react-redux"
import { setLoading, unsetLoading } from "../../redux/loader/loaderActions"

const RankingPage = () => {

    const [usersList, setUsersList] = useState({})
    const navigate = useNavigate();

    const isLoading = useSelector(state => state.loader.isLoading)
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchAndPrepare() {
            dispatch(setLoading())

            let users = await getUsersListing(mapFiltersValuesToConditions({stars: 'stars'}))
            users = listItemUserConverter(users)
            console.log(users)
            setUsersList(users)

            dispatch(unsetLoading())
        }
        fetchAndPrepare()
    },[])

    const navToUserAccountPage = (uid) => {
        console.log('wykryty uid: '+uid)
        navigate(`/user_account/${uid}`)
    }

    return (
        <>
            {isLoading? <Loader /> : (
                <div className='page-container' id="ranking-page-container">
                    <div className='page-header-container' id="ranking-page-header-container">
                        <h1>Ranking</h1>
                    </div>
                    <div className='page-list-view-container' id="ranking-page-list-view-container">
                        <ListView list={usersList} navToUserAccountPage={navToUserAccountPage} />
                    </div>
                </div> )
            }
        </>
    )
}

export default RankingPage

