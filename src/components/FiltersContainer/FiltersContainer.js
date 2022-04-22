import './FiltersContainer.css'
import { AiOutlineClose } from 'react-icons/ai'

const FilterItem = (props) => {

    return (
        <button onClick={props.removeFilter} className='filter-item'>
            {props.k+':'+props.filter}
            <AiOutlineClose />
        </button>
    )
} 

const FiltersContainer = (props) => {

    const removeFilter = (filterField) => {

        let currentFilters = JSON.parse(JSON.stringify(props.filters));
        delete currentFilters[filterField]
        props.setFilters(currentFilters)
    }

    return(
        <>
            {Object.keys(props.filters).length > 0 ? (
                <div id="filters-container">
                    {Object.keys(props.filters).map((key) => {
                        return <FilterItem key={key} k={key} filter={props.filters[key]} removeFilter={() => removeFilter(key)} />
                    })}
                </div>
            ) : ( null )}
        </>
    )
}

export default FiltersContainer