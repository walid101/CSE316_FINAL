import React, { useState }  from 'react';
import { WNavItem, WInput } from 'wt-frontend';
import { useHistory, useLocation}		from "react-router-dom"
const SidebarEntry = (props) => {
    let history = useHistory();
    const [editing, toggleEditing] = useState(false);
    const [preEdit, setPreEdit] = useState(props.name);
    const list_text = props.activeid == props.id ? "list_yellow" : "list_black";
    const handleEditing = (e) => {
        if(e.type === 'click')
        {
            e.stopPropagation();
            setPreEdit(props.name);
            toggleEditing(!editing);
            props.handleSetActive(props.id) 
        }
    };

    const handleSubmit = (e) => {
        handleEditing(e);
        const { name, value } = e.target;
        props.updateListField(props._id, name, value, preEdit);
    };

    const switchScreens = (e) => {
        //console.log(props.id);
        //console.log("Change to Regions Screen!");
        //props.handleSetActive(props.id) 
        //console.log("switching screens!");
        history.push("/_regions", {id: props.id, regionCounter: 0, user: props.user})
    }
    const entryStyle = props.id === props.activeid ? 'list-item list-item-active' : 'list-item ';
    return (
        <>
          <WNavItem 
                className={entryStyle} onDoubleClick={switchScreens} onContextMenu = {switchScreens}
                onClick={handleEditing} hoverAnimation="lighten"
                
            >
                {
                    editing ? <WInput className="list-item-edit" inputClass="list-item-edit-input" wType="lined" barAnimation="solid" name='name' onBlur={handleSubmit} autoFocus={true} defaultValue={props.name} />
                        :   <div className='list-text'>
                                {props.name}
                            </div>
                }
            </WNavItem>
        </>
    );
};

export default SidebarEntry;