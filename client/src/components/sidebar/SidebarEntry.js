import React, { useState }  from 'react';
import { WButton, WNavItem, WInput } from 'wt-frontend';
import { useHistory, useLocation}		from "react-router-dom"
const SidebarEntry = (props) => {
    let history = useHistory();
    const [editing, toggleEditing] = useState(false);
    const [preEdit, setPreEdit] = useState(props.name);
    const list_text = props.activeid == props.id ? "list_yellow" : "list_black";
    const handleEditing = (e) => {
        e.stopPropagation();
        setPreEdit(props.name);
        toggleEditing(!editing);
        props.handleSetActive(props.id) 
    };
    //const setActive = (e) => { props.handleSetActive(props.id);};
    const deleteListCurr = (e) => {
        props.handleSetActive(props.id);
        props.setShowDelete(1);
    }
    const handleSubmit = (e) => {
        handleEditing(e);
        const { name, value } = e.target;
        props.updateListField(props._id, name, value, preEdit);
    };
    const switchScreens = (e) => {
        history.push("/_regions", {id: props.id, regionCounter: 0, user: props.user})
        console.log("Set Show Delete: ", props.setShowDelete);
    };
    const entryStyle = props.id === props.activeid ? 'list-item list-item-active' : 'list-item ';
    //<i class="material-icons list-trash">delete_outline</i>
    return (
        <>
          <WNavItem 
                className={entryStyle} //onContextMenu = {switchScreens}
                //onClick={handleEditing}
                onDoubleClick={switchScreens} hoverAnimation="lighten"
            >
                {
                    
                    editing ? <WInput className="list-item-edit" inputClass="list-item-edit-input" wType="lined" barAnimation="solid" name='name' onBlur={handleSubmit} autoFocus={true} defaultValue={props.name} />
                        :  
                            <div className='list-text'>
                                {props.name}
                                <WButton onClick={handleEditing} wType="texted" className="table-header-button">
                                <i className='fas list-pencil'>&#xf304;</i>
                                </WButton>
                                <WButton onClick={deleteListCurr} wType="texted" className="table-header-button">
                                <i className="material-icons list-trash">delete_outline</i>
                                </WButton>
                            </div>
                }
            </WNavItem>
        </>
    );
};

export default SidebarEntry;