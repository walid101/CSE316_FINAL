import React            from 'react';
import SidebarHeader    from './SidebarHeader';
import SidebarList      from './SidebarList';
const SidebarContents = (props) => {
    return (
        <>
            <SidebarHeader 
                auth={props.auth} createNewList={props.createNewList} 
                undo={props.undo} redo={props.redo} setShowDelete = {props.setShowDelete}
            />
            <SidebarList
                _activeid = {props._activeid}
                activeid={props.activeid} handleSetActive={props.handleSetActive}
                newListMade = {props.newListMade} toggleNewList = {props.toggleNewList}
                todolists={props.todolists} createNewList={props.createNewList}
                updateListField={props.updateListField} setShowDelete = {props.setShowDelete}
                swapToTop = {props.swapToTop}
                topIndex = {props.topIndex}
                handleKeyPress = {props.handleKeyPress}
                user={props.user}
            />
        </>
    );
};

export default SidebarContents;