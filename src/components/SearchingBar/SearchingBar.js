import './SearchingBar.css'
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { useState } from 'react'
import DropDownMenu from '../DropDownMenu/DropDownMenu'

const SearchingBar = (props) => {

    const [filterValue, setFilterValue] = useState('')
    const [isDropDownMenuVisible, setIsDropDownMenuVisible] = useState(false)
    
    const changeDropDownVisibility = (bool) => {
        setIsDropDownMenuVisible(bool)
    }

    const addFilter = (addedFilterField) => {

        let currentFilters = JSON.parse(JSON.stringify(props.filters));
        currentFilters[addedFilterField] = filterValue;
        props.setFilters(currentFilters)
    }

    return (
        <>
            <div id="searching-bar">
                <input type="text" onChange={(event) => setFilterValue(event.target.value)} /> 
                <button onClick={() => changeDropDownVisibility(!isDropDownMenuVisible)} className={"searching-bar-buttons"}>
                    <AiOutlinePlus />
                </button>
                <button onClick={() => props.searchFunction()} className={"searching-bar-buttons"}>
                    <AiOutlineSearch />
                </button>
                {isDropDownMenuVisible ? (
                    <DropDownMenu 
                        options={['name', 'surnmae', 'skills', 'competentions', 'specialisation']} 
                        setOption={addFilter}
                        changeDropDownVisibility={changeDropDownVisibility} 
                    />
                    ) : (
                        null
                )}
            </div>
        </>
    )
}

export default SearchingBar