//import './YourAccountPage.css'
import '../AccountPage.css'
import '../Pages.css'

import Loader from '../../components/Loader/Loader';
import UsertDataComponent from '../../components/UserDataComponent/UserDataComponent';

import { deleteUserAccount, signOutUser } from '../../API/UserAPI';

import { useDispatch, useSelector } from "react-redux"
import { unsetUser } from "../../redux/user/userActions"
import { setLoading, unsetLoading } from '../../redux/loader/loaderActions'

import { useNavigate } from 'react-router-dom';

const YourAccountPage = () => {

    const isLoading = useSelector(state => state.loader.isLoading)
    const loggedUser = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const navToEditAccountPage = () => {
        navigate('/edit_account')
    }

    const logout = async (event) => {

        event.preventDefault()

        try{
            dispatch(setLoading())
            await signOutUser()
            dispatch(unsetUser())
            dispatch(unsetLoading())
            navigate('/')

        }catch(error){
            dispatch(unsetLoading())

            alert('Logout Error '+error.message)
        }
    }

    const deleteAccount = async (event) => {

        event.preventDefault()

        try{
            dispatch(setLoading())
            await deleteUserAccount(loggedUser)
            dispatch(unsetUser())
            dispatch(unsetLoading())
            navigate('/')

        }catch(error){
            dispatch(unsetLoading())

            alert('Logout Error '+error.message)
        }
    }

    return (
        <>
            {isLoading ? <Loader /> : (
                <>
                    <div id="your-account-page-container"
                        className='page-container account-page-container'
                    >
                        <button id="logout-button" className='upper-button' onClick={logout}>logout</button>
                        <>
                            <UsertDataComponent data={loggedUser} />
                        </>
                        <div id="your-account-page-button-actions" className='account-page-button-actions'>
                            <button className='action-button' onClick={navToEditAccountPage}>Edit</button>
                            <button className='action-button' onClick={deleteAccount}>Delete</button>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default YourAccountPage;