//import './CommonRegisterForm.css'
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const CommonAccountSettingsForm = (props) => {

    const [countries, setCountries] = useState([])
    const [cities, setCities] = useState([])

    const location = useLocation()

    useEffect(() => {
        setCountries([
            'Poland',
            'USA',
            'Germany',
            'England',
            'Norway'
        ])

        setCities([
            'Warsaw',
            'New York',
            'Berlin',
            'London',
            'Oslo'
        ])
    },[])

    return (
        <div className="account-settings-form form-template">
            <div className="data-form-unit">
                <label>email: </label>
                <input 
                    type="text" 
                    placeholder="email(jan.kowalski@gmail.com)" 
                    defaultValue={props.dataSet['email']}
                    onChange={(event) => props.setData('email', event.target.value)}
                />
            </div>
            
            <div className="data-form-unit">
                <label>password: </label>
                <input 
                    type="password" 
                    placeholder="min 6 characters" 
                    defaultValue={props.dataSet['password']}
                    onChange={(event) => props.setData('password', event.target.value)} 
                />
            </div>
            
            <div className="data-form-unit">
                <label>country: </label>
                <select onChange={(event) => props.setData('country', event.target.value)}>
                    <option selected disabled hidden>--select--</option>
                    {countries.map((element, key) => {
                        return props.dataSet['country'] === element ? (
                            <option selected key={key} >{element}</option>
                        ) : <option key={key} >{element}</option>
                    })}
                </select>
            </div>
            
            <div className="data-form-unit">
                <label>city: </label>
                <select onChange={(event) => props.setData('city', event.target.value)}>
                    <option selected disabled hidden>--select--</option>
                    {cities.map((element, key) => {
                        return props.dataSet['city'] === element ? ( 
                            <option selected key={key}>{element}</option>
                        ) : <option key={key}>{element}</option>
                    })}
                </select>
            </div>
            
            <div className="data-form-unit">
                <label>goals: </label>
                <input 
                    type="text" 
                    placeholder="goals(separated by commas)" 
                    defaultValue={props.dataSet['goals']}
                    onChange={(event) => props.setData('goals', event.target.value)} 
                />
            </div>
            
            <div className="data-form-unit">
                <label>specialisation: </label>
                <input 
                    type="text" placeholder="specialisation(separated by commas)"
                    defaultValue={props.dataSet['specialisation']}
                    onChange={(event) => props.setData('specialisation', event.target.value)} 
                />
            </div>
            
            {location.pathname === '/edit_account' ? ( null ) : (
                <div className="data-form-unit">
                    <label>type of account: </label>
                    <select onChange={(event) => props.setData('typeOfAccount', event.target.value)}>
                        <option selected disabled hidden>--select--</option>
                        {['person', 'institution'].map((element, key) => {
                            return props.dataSet['typeOfAccount'] === element ? (
                                <option selected key={key}>{element}</option>
                            ) : <option key={key}>{element}</option>
                        })}
                    </select>
                </div>
            )}
        </div>
    )
}

export default CommonAccountSettingsForm