import { useEffect } from "react"
import './ListView.css'

const ListItemView = (props) => {

    return (
        <div className="list-item-background" onClick={() => props.handler()}>
            <div className="list-item-container">
                <div className="list-item-image">
                    <img src={props.element.getImage()} alt='' />
                </div>
                <div className="list-item-header">
                    <label>{props.element.getHeader()}</label>
                </div>
                <div className="list-item-corner">
                    <label className="value-label">{props.element.getCornerLabel()+':'}</label>
                    <label className="value">{props.element.getCorner()}</label>
                </div>
                <div className="list-item-first-row">
                    <label className="value-label">{props.element.getFirstRowLabel()+':'}</label>
                    <label className="value">{props.element.getFirstRow()}</label>
                </div>
                <div className="list-item-second-row">
                    <label className="value-label">{props.element.getSecondRowLabel()+':'}</label>
                    <label className="value">{props.element.getSecondRow()}</label>
                </div>
            </div>
        </div>
    )
}

const ListView = (props) => {

    useEffect(() => {
        console.log(props.list)

    },[])

    return (
        <>
            {
                Object.keys(props.list).map((key) => {
                    return <ListItemView key={key} element={props.list[key]} handler={() => props.navToUserAccountPage(key)} />
                })
            }
        </>
    )
}

export default ListView