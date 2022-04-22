import './AccountSettingsPage.css'
import ImageComponent from '../../components/ImageComponent/ImageComponent'
import CommonAccountSettingsForm from '../../components/CommonAccountSettingsForm/CommonAccountSettingsForm'
import PersonAccountSettingsForm from '../../components/PersonAccountSettingsForm/PersonAccountSettingsForm'
import InstitutionAccountSettingsForm from '../../components/InstitutionAccountSettingsForm/InstitutionAccountSettingsForm'
import { useEffect, useState } from 'react'
import { isCommonUserDataValid } from '../../utils/Validations'

import Loader from '../../components/Loader/Loader'
import { useSelector } from "react-redux"

const AccountSettingsPage = () => {

    const [userData, setUserData] = useState({})
    const [formPage, setFormPage] = useState('common')

    const loggedUser = useSelector(state => state.user.user)

    useEffect(() => {
        let user = JSON.parse(JSON.stringify(loggedUser))

        Object.keys(user).forEach((element, key) => {
            if(Array.isArray(user[element])){
                console.log(user[element].join(','))
                user[element] = user[element].join(',')
            }
        })

        console.log('use effect user: '+JSON.stringify(user))
        setUserData(user)
    },[])

    const isLoading = useSelector(state => state.loader.isLoading)

    const setUserDataField = (identity, value) => {

        let tempUserData = userData
        tempUserData[identity] = value;
        setUserData(tempUserData)
    }

    const navToFormPage = () => {

        console.log(formPage+' '+JSON.stringify(userData))

        if(formPage === 'common'){

            if(isCommonUserDataValid(userData)){
                setFormPage(userData['typeOfAccount'])
            }else{
                alert('invalid data')
            }
        }else{
            setFormPage('common')
        }
    }

    return (
        <>
            {isLoading? (
                <Loader />
            ) : (
            <>
                
                <div id="account-settings-page-container"
                    className="page-container"
                >
                    <div id="account-settings-page-header-container"
                        className='page-header-container'
                    >
                        <h1>Account Settings</h1>
                    </div>
                    <div id="account-settings-page-image-container"
                        className='page-image-container'
                    >
                        <ImageComponent image={userData['avatar']} setData={setUserDataField} />
                    </div>
                    <div id="account-settings-page-form-container"
                        className='form-container'
                    >
                        {
                            formPage === 'person' ? (
                                <>
                                    <button className={"account-settings-page-form-button"} onClick={navToFormPage}>{'<'}</button><br />
                                    <PersonAccountSettingsForm oldAvatar={loggedUser['avatar']} dataSet={userData} setData={setUserDataField} />
                                </>
                            ) : formPage === 'institution' ? (
                                <>
                                    <button className={"account-settings-page-form-button"} onClick={navToFormPage} >{'<'}</button><br />
                                    <InstitutionAccountSettingsForm oldAvatar={loggedUser['avatar']} dataSet={userData} setData={setUserDataField} />
                                </>
                            ) : (
                                <>
                                    <CommonAccountSettingsForm dataSet={userData} setData={setUserDataField} />
                                    <button className={"account-settings-page-form-button"} onClick={navToFormPage} >{'>'}</button><br />
                                </>
                            )
                        }
                    </div>
                </div>
            </>
            )}
        </>
    )
}

export default AccountSettingsPage