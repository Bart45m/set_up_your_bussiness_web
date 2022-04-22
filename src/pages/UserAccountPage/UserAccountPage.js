//import './YourAccountPage.css'
import '../AccountPage.css'
import '../Pages.css'
import { auth } from '../../firebase';

import Loader from '../../components/Loader/Loader';
import UsertDataComponent from '../../components/UserDataComponent/UserDataComponent';

import { useDispatch, useSelector } from "react-redux"
import { setLoading, unsetLoading } from '../../redux/loader/loaderActions'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserData } from '../../API/UserAPI';
import UserAccountButtonsAction from '../../components/UserAccountButtonsAction/UserAccountButtonsAction';
import { getPartnersStatus } from '../../API/PartnerAPI';


const UserAccountPage = () => {

    const params = useParams();
    
    const [userAccountData, setUserAccountData] = useState({})
    const [partnersStatus, setPartnersStatus] = useState({})

    const isLoading = useSelector(state => state.loader.isLoading)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
            async function fecthAndDisplay(){

                dispatch(setLoading())

                let userData = await getUserData(params.uid)
                let partnersData = await getPartnersStatus(auth.currentUser.uid, params.uid)
                console.log(partnersData)
                setPartnersStatus(partnersData)
                setUserAccountData(userData)
                
                dispatch(unsetLoading())
            }
            fecthAndDisplay()
    },[])

    const navToChatPage = (event) => {
        navigate('/chat/'+partnersStatus['partners_id'], {
            state: {
                user_id: userAccountData['user_id'],
                username: userAccountData['name'],
                avatar: userAccountData['avatar']
            }
        })
    }

    return (
        <>
            {isLoading ? <Loader /> : (
                <>
                    <div id="user-account-page-container"
                        className='page-container account-page-container'
                    >
                        <button id="back-button" className='upper-button' onClick={() => navigate(-1)}>{'<'}</button>
                        <>
                            <UsertDataComponent data={userAccountData} />
                        </>
                        <>
                            <UserAccountButtonsAction 
                                auth_id={auth.currentUser.uid}
                                user_id={params.uid}
                                partnersStatus={partnersStatus}
                                setPartnersStatus={setPartnersStatus}
                                navToChatPage={navToChatPage}
                            />
                        </>
                    </div>
                </>
            )}
        </>
    )
}

export default UserAccountPage;

 /*Object.keys(partnersData).length !== 0 ? setPartnersStatus(partnersData) : (
                    setPartnersStatus({
                        partners_id: auth.currentUser.uid+'_'+params.uid,
                        users: [auth.currentUser.uid, params.uid]
                    })
                )*/