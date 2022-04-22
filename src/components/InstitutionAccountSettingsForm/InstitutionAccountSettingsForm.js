//import './PersonAccountSettingsForm.css'
import { useEffect, useState } from "react"
import { isInstiutionUserDataValid } from "../../utils/Validations"
import { auth } from "../../firebase"
import { signUpUser, updateUserAccount } from "../../API/UserAPI"

import { useDispatch } from "react-redux"
import { setLoading, unsetLoading } from "../../redux/loader/loaderActions"
import { setUser } from "../../redux/user/userActions"
import { useNavigate } from 'react-router-dom'

const InstitutionAccountSettingsForm = (props) => {

    const [typesOfInsitution, setTypesOfInstitution] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        setTypesOfInstitution([
            'Corporation',
            'Small private bussiness',
            'Big private bussiness',
            'Medium private bussiness',
            'City administration',
            'State administration',
            'Country concern',
            'Global concern',
            'Government institution',
            'Government company',
        ])
    },[])

    const confirmData = async (event) => {
        event.preventDefault()

        try{
            dispatch(setLoading())

            if(isInstiutionUserDataValid(props.dataSet)){

                if(auth.currentUser){

                    let user = await updateUserAccount(props.dataSet, props.oldAvatar)
                    console.log(user)
                    dispatch(setUser(JSON.parse(user)))
                    navigate('/')
                }else{

                    let user = await signUpUser(props.dataSet)
                    console.log(user)
                    dispatch(setUser(JSON.parse(user)))
                    navigate('/')
                }
            }else{
                dispatch(unsetLoading())
                alert('invalid data')
            }

            dispatch(unsetLoading())
        }catch(error){
            dispatch(unsetLoading())
        }
    }

    return (
        <div className="account-settings-form form-template">
            <form>
                <div className="data-form-unit">
                    <label>name: </label>
                    <input 
                        type="text" 
                        placeholder="name"
                        defaultValue={props.dataSet['name']}
                        onChange={(event) => props.setData('name', event.target.value)}
                    />
                </div>
                
                <div className="data-form-unit">
                    <label>type of institution: </label>
                    <select
                        onChange={(event) => props.setData('typeOfInstitution', event.target.value)}
                    >
                        <option selected hidden disabled>--select--</option>
                        {typesOfInsitution.map((element, key) => {
                            return props.dataSet['typeOfInstitution'] === element ? (
                                <option selected key={key} >{element}</option>
                            ) : <option key={key} >{element}</option>
                        })}
                        
                    </select>
                </div>
                
                <div className="data-form-unit">
                    <label>competentions</label>
                    <textarea 
                        placeholder="competentions(separated by commas)"
                        defaultValue={props.dataSet['competentions']}
                        onChange={(event) => props.setData('competentions', event.target.value)}
                    ></textarea>
                </div>

                <input type="submit" value={'confirm'} className="confirm-submit" onClick={confirmData} /><br />
            </form>
        </div>
    );
}

export default InstitutionAccountSettingsForm
