import './SearchingUsersPage.css'
import { useEffect, useState } from 'react'
import { getUsersListing, mapFiltersValuesToConditions } from '../../API/UserAPI'
import { listItemUserConverter } from '../../utils/ListItem'
import ListView from '../../components/ListView/ListView'
import { useNavigate } from 'react-router-dom'
import SearchingBar from '../../components/SearchingBar/SearchingBar'
import Loader from '../../components/Loader/Loader'
import FiltersContainer from '../../components/FiltersContainer/FiltersContainer'

import { useDispatch, useSelector } from "react-redux"
import { setLoading, unsetLoading } from "../../redux/loader/loaderActions"

const SearchingUsersPage = () => {

    const [usersList, setUsersList] = useState({})
    const [filters, setFilters] = useState({})

    const navigate = useNavigate();

    const isLoading = useSelector(state => state.loader.isLoading)
    const dispatch = useDispatch()

    const fetchUsers = async () => {
        console.log(filters)
        dispatch(setLoading())
        let users = await getUsersListing(mapFiltersValuesToConditions(filters))
            users = listItemUserConverter(users)
            console.log(users)
            setUsersList(users)
        dispatch(unsetLoading())
    }

    const navToUserAccountPage = (uid) => {
        console.log('wykryty uid: '+uid)
        navigate(`/user_account/${uid}`)
    }

    return (
        <>
            {isLoading? <Loader /> : (
                <div className='page-container' id="searching-users-page-container">
                    <div className='page-header-container' id="searching-users-page-header-container">
                        <h1>Looking for new partners</h1>
                    </div>
                    <SearchingBar 
                            filters={filters} 
                            setFilters={setFilters} 
                            searchFunction={fetchUsers}
                    />
                    <FiltersContainer 
                        filters={filters} 
                        setFilters={setFilters} 
                    />
                    <div className='page-list-view-container' id="searching-users-page-list-view-container">
                        <ListView list={usersList} navToUserAccountPage={navToUserAccountPage} />
                    </div>
                </div>
            )}
        </>
    )
}

export default SearchingUsersPage

