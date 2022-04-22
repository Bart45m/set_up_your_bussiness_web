import './YourPartnersPage.css'
import { useEffect, useState } from 'react'
import { getUsersListing, mapFiltersValuesToConditions } from '../../API/UserAPI'
import { listItemUserConverter } from '../../utils/ListItem'
import ListView from '../../components/ListView/ListView'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import { auth } from '../../firebase'

import { useDispatch, useSelector } from "react-redux"
import { setLoading, unsetLoading } from "../../redux/loader/loaderActions"
import { getPartnersListing } from '../../API/PartnerAPI'

const YourPartnersPage = () => {

    const [usersList, setUsersList] = useState({})
    const navigate = useNavigate();

    const isLoading = useSelector(state => state.loader.isLoading)
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchAndPrepare() {
            dispatch(setLoading())

            let partners = await getPartnersListing(auth.currentUser.uid)
            console.log(partners)
            let users = await getUsersListing(mapFiltersValuesToConditions({partners: partners}))
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
                <div className='page-container' id="your-partners-page-container">
                    <div className='page-header-container' id="your-partners-page-header-container">
                        <h1>Your Partners</h1>
                    </div>
                    <div className='page-list-view-container' id="your-partners-page-list-view-container">
                        <ListView list={usersList} navToUserAccountPage={navToUserAccountPage} />
                    </div>
                </div> )
            }
        </>
    )
}

export default YourPartnersPage

