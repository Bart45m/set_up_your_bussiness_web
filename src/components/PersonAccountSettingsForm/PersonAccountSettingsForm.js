//import './PersonAccountSettingsForm.css'
import { useEffect, useState } from "react"
import { signUpUser, updateUserAccount } from "../../API/UserAPI"
import { isPersonUserDataValid } from "../../utils/Validations"
import { auth } from "../../firebase"
import { useDispatch } from "react-redux"
import { setLoading, unsetLoading } from "../../redux/loader/loaderActions"
import { setUser } from "../../redux/user/userActions"
import { useNavigate } from 'react-router-dom'

const PersonAccountSettingsForm = (props) => {

    const [degrees, setDegrees] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        setDegrees([
            'Professor',
            'Doctor',
            'Master',
            'Bachelor',
            'Engineer',
            'Medium general',
            'Medium technical',
            'Vocational',
            'Basic'
        ])
    },[])

    const confirmData = async (event) => {
        event.preventDefault()

        try{
            dispatch(setLoading())

            if(isPersonUserDataValid(props.dataSet)){

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
                        type="text" placeholder="name" 
                        defaultValue={props.dataSet['name']}
                        onChange={(event) => props.setData('name', event.target.value)}
                    />
                </div>
                <div className="data-form-unit">
                    <label>surname: </label>
                    <input 
                        type="text" placeholder="surname" 
                        onChange={(event) => props.setData('surname', event.target.value)}
                        defaultValue={props.dataSet['surname']}
                    />
                </div>
                <div className="data-form-unit">
                    <label>degree: </label>
                    <select
                        onChange={(event) => props.setData('degree', event.target.value)}
                    >
                        <option selected hidden disabled>--select--</option>
                        {degrees.map((element, key) => {
                            return props.dataSet['degree'] === element ? (
                                <option selected key={key} >{element}</option>
                            ) : <option key={key} >{element}</option>
                        })}
                    </select>
                </div>
                <div className="data-form-unit">
                    <label>skills: </label>
                    <textarea 
                        placeholder="skills(separated by commas)"
                        defaultValue={props.dataSet['skills']}
                        onChange={(event) => props.setData('skills', event.target.value)}
                    ></textarea>
                </div>
                <div className="data-form-unit">
                    <label>interests: </label>
                    <textarea 
                        placeholder="interests(separated by commas)"
                        defaultValue={props.dataSet['interests']}
                        onChange={(event) => props.setData('interests', event.target.value)}
                    ></textarea>
                </div>

                <input type="submit" value={'confirm'} className="confirm-submit" onClick={confirmData} />
            </form>
        </div>
        
    );
}

export default PersonAccountSettingsForm
