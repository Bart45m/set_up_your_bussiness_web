import "./LoginPage.css"
import { useState } from "react"
import Loader from "../../components/Loader/Loader"

import { useDispatch, useSelector } from "react-redux"
import { setLoading, unsetLoading } from "../../redux/loader/loaderActions"
import { setUser } from "../../redux/user/userActions"

import { signInUser } from "../../API/UserAPI"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const isLoading = useSelector(state => state.loader.isLoading)
    const dispatch = useDispatch()
    
    const navigate = useNavigate()

    const navToRegisterAccountPage = async () => {

        navigate('/register_account')
    }

    const login = async (event) => {
        event.preventDefault()

        try{
            dispatch(setLoading())
            let user = await signInUser(email, password)
            console.log(user)
            dispatch(setUser(user))
            dispatch(unsetLoading())

        }catch(error){
            dispatch(unsetLoading())
        }
    }

    return (
        <>
            {isLoading ? <Loader /> : (
            <div id="login-page-container"
                className="page-container"
            >
                <div id="login-page-header-container"
                    className="page-header-container"
                >
                    <h1>SetUpYourBussiness</h1>
                </div>
                <div id="login-page-logo-container"
                    className="page-image-container"
                >
                    <img src={process.env.PUBLIC_URL + '/Logo_3.png'} alt='Logo_3.png' id='logo'></img>
                </div>
                <div id="login-page-form-container"
                    className="form-container"
                >
                    <form id="login-page-form"
                        className="form-template"
                    >
                        <div className="data-form-unit">
                            <label>email:</label>
                            <input type="text" value={email} placeholder="email(jan.kowalski@gmail.com)" onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="data-form-unit">
                            <label>password:</label>
                            <input type="password" value={password} placeholder="password" onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        <input type="submit" value={"Login"} id="login-submit" onClick={login} />
                        <input type="button" value={"Register"} id="register-button" onClick={navToRegisterAccountPage} ></input>
                    </form>
                </div>
            </div>
            ) }
        </>
    )
}

export default LoginPage
