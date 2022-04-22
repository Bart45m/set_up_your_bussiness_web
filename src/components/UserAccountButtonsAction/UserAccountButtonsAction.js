import './UserAccountButtonsAction.css'
import { updatePartnersStatus, deletePartnersStatus } from '../../API/PartnerAPI'
import { useDispatch } from "react-redux"
import { setLoading, unsetLoading } from '../../redux/loader/loaderActions'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserAccountButtonsAction = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        console.log(Object.keys(props.partnersStatus).length)
    })

    const handleUpdateStatus = async (partners_id, auth_id, user_id, auth_status, user_status) => {

        dispatch(setLoading())

        let status = await updatePartnersStatus(
            partners_id, auth_id, user_id, auth_status, user_status
        )
        console.log(status)
        props.setPartnersStatus(status)

        dispatch(unsetLoading())
    }

    const handleDeleteStatus = async (partners_id) => {

        dispatch(setLoading())

        let status = await deletePartnersStatus(partners_id)
        console.log(status)
        props.setPartnersStatus(status)

        dispatch(unsetLoading())
    }

    const template = () => {

        if(props.auth_id === props.user_id){

            return <div id="user-account-page-button-actions" className='account-page-button-actions'>
                        <label>(Your Account)</label>
                    </div>
        }else{
            if(Object.keys(props.partnersStatus).length === 0){

                return <div id="user-account-page-button-actions" className='account-page-button-actions'>
                            <button className='action-button' onClick={(event) => handleUpdateStatus(
                                props.auth_id+'_'+props.user_id, props.auth_id, props.user_id, 'CONFIRMED', 'UNCONFIRMED'
                            )}>Add Partner</button>
                        </div>
            }else{
        
                if(props.partnersStatus.status[props.partnersStatus.users.indexOf(props.auth_id)] === 'CONFIRMED'){
        
                    if(props.partnersStatus.status[props.partnersStatus.users.indexOf(props.user_id)] === 'CONFIRMED'){
        
                        return <div id="user-account-page-button-actions" className='account-page-button-actions'>
                                    <button className='action-button' onClick={props.navToChatPage}>Send Message</button>
        
                                    <button className='action-button' onClick={
                                        (event) => handleDeleteStatus(props.partnersStatus['partners_id'])
                                    }>Delete partner</button>
        
                                    <button className='action-button' onClick={
                                        (event) => handleUpdateStatus(
                                            props.partnersStatus['partners_id'], props.auth_id, props.user_id, 'CONFIRMED', 'BLOCKED'
                                        )
                                    }>Block partner</button>
                                </div>
        
                    }else if(props.partnersStatus.status[props.partnersStatus.users.indexOf(props.user_id)] === 'UNCONFIRMED'){
        
                        return <div id="user-account-page-button-actions" className='account-page-button-actions'>
                                    <label>Wait for Confirmation</label>
                                </div>
        
                    }else if(props.partnersStatus.status[props.partnersStatus.users.indexOf(props.user_id)] === 'BLOCKED'){
        
                        return <div id="user-account-page-button-actions" className='account-page-button-actions'>
                                    <button className='action-button' onClick={
                                        (event) => handleUpdateStatus(
                                            props.partnersStatus['partners_id'], props.auth_id, props.user_id, 'CONFIRMED', 'CONFIRMED'
                                        )
                                    }>Unblock</button>
                                </div>
        
                    }
                }else if(props.partnersStatus.status[props.partnersStatus.users.indexOf(props.auth_id)] === 'UNCONFIRMED'){
        
                    return <div id="user-account-page-button-actions" className='account-page-button-actions'>
                                <button className='action-button' onClick={
                                    (event) => handleUpdateStatus(
                                        props.partnersStatus['partners_id'], props.auth_id, props.user_id, 'CONFIRMED', 'CONFIRMED'
                                    )
                                }>Confirm</button>
                                
                                <button className='action-button' onClick={
                                    (event) => handleDeleteStatus(props.partnersStatus['partners_id'])
                                }>Reject</button>
                            </div>
                    
                }else if(props.partnersStatus.status[props.partnersStatus.users.indexOf(props.auth_id)] === 'BLOCKED'){
        
                    return <div id="user-account-page-button-actions" className='account-page-button-actions'>
                        <label>You are blocked</label>
                    </div>
        
                }
            }
        }
    }

    return template()
}

export default UserAccountButtonsAction


/**
 * {}
 * 
 * 
 * auth: confirmed
 * user: unconfirmed
 * 
 * auth: confirmed
 * user: confirmed
 * 
 * auth: confirmed
 * user: blocked
 * 
 * auth: unconfirmed
 * user: confirmed
 * 
 * auth: blocked
 * user: confirmed
 * 
 * 
 */

