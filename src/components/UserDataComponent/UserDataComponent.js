import { useEffect, useState } from 'react'
import './UserDataComponent.css'

const UsertDataComponent = (props) => {

    const [order, setOrder] = useState([])

    useEffect(() => {
        if(props.data.typeOfAccount === 'person'){
            setOrder(['email', 'name', 'surname', 'country', 'city', 'specialisation', 'degree', 'skills', 'interests', 'goals', 'stars'])
        }else{
            setOrder(['email', 'name', 'country', 'city', 'specialisation', 'typeOfInstitution', 'competentions', 'goals', 'stars'])
        }
        console.log(props.data)
    }, [])

    return (
        <>
            <div 
                className='page-header-container account-page-header-container'
            >       
                <h1>{props.data['name']+' '+(props.data['typeOfAccount'] === 'person' ? props.data['surname'] : '')}</h1>
            </div>        
            <div 
                className='page-image-container account-page-image-container'
            >
                <img src={props.data['avatar'] ? props.data['avatar'] : process.env.PUBLIC_URL + '/Person_5.png'} id="image" alt={''}></img>
            </div>
            <div 
                className='form-container account-page-data-container'
            >
                <div 
                    className='form-template account-page-data'
                >
                    {
                        order.map((key, element) => {
                        return <div key={key} className="data-form-unit">
                                    <label >{key}</label>
                                    <input type={"text"} value={props.data[key]} disabled />
                                </div>
                            })
                        }
                </div>
            </div>
        </>
    )
}

export default UsertDataComponent