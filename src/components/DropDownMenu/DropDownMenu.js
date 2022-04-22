import { useState } from 'react';
import './DropDownMenu.css'
import { AiOutlineClose } from 'react-icons/ai'

const DropDownMenu = (props) => {

    const handleClick = (element) => {
        props.setOption(element)
        props.changeDropDownVisibility(false)
    }

    /*window.onClick = function(event) {
        //toggleVisibility()
        props.changeDropDownVisibility(false)
    }*/

    return(
        <div className="dropdown">
            <div id="myDropdown" className="dropdown-content">
                <button onClick={(event) => props.changeDropDownVisibility(false)}>
                    <AiOutlineClose />
                </button>
                {
                    props.options.map((element, key) => {
                        return <div className="dropdown-option" key={key} onClick={(event) => handleClick(element)}>{element}</div>
                    })
                }
            </div>
        </div>
    )
}

/**
 * <div class="dropdown">
            <button onClick={myFunction} class="dropbtn">+</button>
            <div id="myDropdown" class="dropdown-content">
                <div>Home</div>
                <div>About</div>
                <div>Contact</div>
            </div>
        </div>
 */

export default DropDownMenu