import { hashSync } from 'bcryptjs';
import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { WButton, WRow, WCol } from 'wt-frontend';
import WInput from 'wt-frontend/build/components/winput/WInput';

const TableHeader = (props) => {
    let history = useHistory();
    const buttonStyle = props.disabled ? ' table-header-button-disabled ' : 'table-header-button ';
    const redoStyle = props.hasRedo ? ' topArrow-white' : ' topArrow-black';
    let undoStyle = ' topArrow-white';
    console.log("hasRedo? : " , props.hasRedo);
    if(props.hasUndo === false)
    {
        undoStyle = ' topArrow-black';
    }
    const clickDisabled = () => { };
    const [taskClick, updateTaskClick] = useState(1);
    const [dateClick, updateDateClick] = useState(1);
    const [statClick, updateStatClick] = useState(1);
    const handleTaskClick = (e) => {
        updateTaskClick(taskClick+1);//odd = sort less to great , even => great to less
        props.sortList(1, taskClick);
    }
    const handleDateClick = (e) => {
        updateDateClick(dateClick + 1);
        props.sortList(2, dateClick);
    }
    const handleStatClick = (e) => {
        updateStatClick(statClick + 1);
        props.sortList(3, statClick);
    }
    const handleClose = (e) => {
        props.clearTransactions();
        //{_id:props.parReg, regionCounter: counter}
        //history.goBack();
        if(props.activeList.level < 1){console.log("PUSH TO MAPS!");history.push("/maps");}
        else
        {
            let counter = props.histCount-1;
            history.push("/_regions", {_id: props.activeList.parentId, regionCounter: counter, user: props.user})
        }
        
    }
    const checkEnter = (e) => {
        if(e.key === "Enter")
        {
            //Here we edit parent if it is possible
            let newParent = e.target.value;
            let newParentList = props.todolists.find(list => list.name === newParent);//find name
            let exists = newParentList ? true : false;
            if(!exists)
            {
                alert("That parent Does not exist!");
            }
            else if(props.activeList.level > newParentList.level)
            {
                alert("Please Select a Parent Region With a Higher Level than: ", props.activeList.level);
            }
            else
            {
                props.updateList(props.activeList_id, "parentId", newParentList._id, props.activeList_id);
            }
        }
    }
    return (
        <WRow className="table-header">  
            <WCol size = "2">
                <WButton className={`sidebar-buttons undo-redo ${undoStyle}`} onClick={props.undo} wType="texted" clickAnimation="ripple-light" shape="rounded">
                <i className="material-icons undo-styled">subdirectory_arrow_right</i>
                </WButton>
                <WButton className={`sidebar-buttons undo-redo redo " ${redoStyle}`} onClick={props.redo} wType="texted" clickAnimation="ripple-light" shape="rounded">
                    <i className="material-icons redo-styled">subdirectory_arrow_left</i>
                </WButton>
                <WButton className={`sidebar-buttons`} onClick={props.addItem} wType="texted" className={`${buttonStyle}`}>
                        <i className="material-icons add-btn">add_box</i>
                </WButton>
            </WCol>
            <WCol size = "5">
                <WInput className={"parentEdit-Input"} onKeyPress={checkEnter} defaultValue={props.activeList.name}>
                    
                </WInput>
            </WCol>
            <WCol size = "4"></WCol>
            <WCol size="1">
                <div className="table-header-buttons">
                    <WButton onClick={handleClose} wType="texted" className={`${buttonStyle}`}>
                        <i className="material-icons close-btn">close</i>
                    </WButton>
                </div>
            </WCol>
            <WCol size="2" className = "title-header">
                <WButton className='table-header-section' wType="texted" onClick = {
                    handleTaskClick
                }>Name</WButton>
            </WCol>

            <WCol size="2" className = "title-header">
                <WButton className='table-header-section' wType="texted" onClick = {
                    handleDateClick
                }>Capital</WButton>
            </WCol>

            <WCol size="2" className = "title-header">
                <WButton className='table-header-section' wType="texted" onClick = {
                    handleStatClick
                }>Leader</WButton>
            </WCol>
            <WCol size = "2" className = "title-header">
                <WButton className='table-header-section' wType="texted" onClick = {
                    handleStatClick
                }>Flag</WButton>
            </WCol>
            <WCol size = "4" className = "title-header">
                <WButton className='table-header-section' wType="texted" onClick = {
                    handleStatClick
                }>Landmarks</WButton>
            </WCol>
        </WRow>
    );
};

export default TableHeader;