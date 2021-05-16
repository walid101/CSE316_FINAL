import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';
import { useHistory }		from "react-router-dom";
const TableEntry = (props) => {
    let history = useHistory();
    const { data } = props;
    let moveUpColor = ' topArrow-white';
    let moveDownColor = ' topArrow-white';
    if(props.index === props.activeList.items.length-1)
    {
        moveDownColor = ' topArrow-black';
    }
    if(props.index === 0)
    {
        moveUpColor = ' topArrow-black';
    }
    const completeStyle = data.completed ? ' complete-task' : ' incomplete-task';
    const assignedStyle = data.completed ? ' assign-black' : ' assign-red';
    const assigned_to = data.assigned_to;
    const description = data.description;
    const due_date = data.due_date;
    const status = data.completed;
    const landmark = data.landmark;
    const [editingDate, toggleDateEdit] = useState(false);
    const [editingDescr, toggleDescrEdit] = useState(false);//hook
    const [editingStatus, toggleStatusEdit] = useState(false);
    const [editingAssign, toggleAssignEdit] = useState(false);
    const [editingLandmark, toggleLandEdit] = useState(false);
    //const [regionPageCount, toggleRegionPage] = useState(0);//reset to 0?
    const handleAssignEdit = (e) => {
        toggleAssignEdit(false);
        const newAssign = e.target.value ? e.target.value : 'No Assign.'
        const prevAssign = assigned_to;
        props.editItem(data._id, 'assigned_to', newAssign, prevAssign);
    };
    const handleDateEdit = (e) => {
        toggleDateEdit(false);
        const newDate = e.target.value ? e.target.value : 'No Date';
        const prevDate = due_date;
        props.editItem(data._id, 'due_date', newDate, prevDate);
    };

    const handleDescrEdit = (e) => {
        toggleDescrEdit(false);
        const newDescr = e.target.value ? e.target.value : 'No Description';
        const prevDescr = description;
        props.editItem(data._id, 'description', newDescr, prevDescr);
    };

    const handleStatusEdit = (e) => {
        toggleStatusEdit(false);
        const newStatus = e.target.value ? e.target.value : 'Input Leader';
        const prevStatus = status;
        props.editItem(data._id, 'completed', newStatus, prevStatus);
    };

    const handleLandEdit = (e) => {
        toggleLandEdit(false);
        const newLand = e.target.value ? e.target.value : 'No Landmark';
        const prevLand = description;
        props.editItem(data._id, 'landmark', newLand, prevLand);
    };

    const checkEnterDesc = (e) => {
        if(e.key === "Enter")
        {
            handleDescrEdit(e);
        }
    }
    const checkEnterDate = (e) => {
        if(e.key === "Enter")
        {
            handleDateEdit(e);
        }
    }
    const checkEnterStat = (e) => {
        if(e.key === "Enter")
        {
            handleStatusEdit(e);
        }
    }
    const checkEnterAssign = (e) => {
        if(e.key === "Enter")
        {
            handleAssignEdit(e);
        }
    }
    const checkEnterLand = (e) => {
        if(e.key === "Enter")
        {
            handleLandEdit(e);
        }
    }

    const handleMoveUp = () => {
        if(props.index !== 0)
        {
            props.reorderItem(data._id, -1);
        }
    }   
    const handleMoveDown = () => 
    {
        if(props.index !== props.activeList.items.length - 1)
        {
            props.reorderItem(data._id, 1);
        }
    }
    const switchScreens = (e) => {
        console.log("switching screens!");
        //console.log("subReg: ", data.subRegId);
        let counter = props.pageCount+1;
        if(counter < 1000){counter = 1000;}
        history.push("/_regions", {_id: data.subRegId, regionCounter: counter, user: props.user,
                                   par_id: data.parRegId})
    };
    const editItem = (itemID, field, value, prev) => {/*props.editItem(itemID, field, value, prev);*/}
    const switchToLandScreen = (e) => {
        console.log("switching to Landmark Screen!");
        //console.log("Pushing item var which is: ", data);
        history.push("/landmarks", {list: props.activeList, itemId: data._id, item: data, histCount: props.histCount})
    }
    /**
     *  <WButton className = {`table-entry-buttons ${moveUpColor}`} onClick={handleMoveUp} wType="texted">
                        <i className="material-icons">expand_less</i>
                    </WButton>
                    <WButton className = {`table-entry-buttons ${moveDownColor}`} onClick={handleMoveDown} wType="texted">
                        <i className="material-icons">expand_more</i>
                    </WButton>
     */
    return (
        <WRow className='table-entry'>
            <WCol size="2">
            {
                editingDescr || description === ''
                    ? <WInput
                        className='table-input' onBlur={handleDescrEdit}
                        //{this.addEventListener()}
                        onKeyPress={checkEnterDesc}
                        autoFocus={true} defaultValue={description} type='text'
                        wType="outlined" barAnimation="solid" inputClass="table-input-class"
                    />
                    : <div className="table-text"
                        onContextMenu={switchScreens}
                        onClick={() => toggleDescrEdit(!editingDescr)}
                    >{description}
                    </div>
            }
            </WCol>

            <WCol size="2">
                {
                    editingDate ? <WInput
                        className='table-input' onBlur={handleDateEdit}
                        onKeyPress={checkEnterDate}
                        autoFocus={true} defaultValue={due_date} type='text'
                        wType="outlined" barAnimation="solid" inputClass="table-input-class"
                    />
                        : <div className="table-text"
                            onClick={() => toggleDateEdit(!editingDate)}
                        >{due_date}
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    editingStatus ? <WInput
                        className='table-input' onBlur={handleStatusEdit}
                        onKeyPress={checkEnterStat} type='text'
                        autoFocus={true} defaultValue={status}
                    >
                    </WInput>
                        : <div className="table-text"
                            onClick={() => toggleStatusEdit(!editingStatus)}>
                            {status}
                        </div>
                }
            </WCol>
            <WCol size = "2">
            {
                    editingAssign || assigned_to === ''
                    ? <WInput
                        className= "table-input" onBlur={handleAssignEdit}
                        onKeyPress={checkEnterAssign}
                        autoFocus={true} defaultValue={assigned_to} type='text'
                        wType="outlined" barAnimation="solid" 
                        color = "blue"
                    />
                    :   <div className="table-text"
                            onClick={() => toggleAssignEdit(!editingAssign)}
                        >{assigned_to}
                        </div>
            }
            </WCol>
            <WCol size="3">
            {
                   editingLandmark
                   ? <WInput
                       className='table-input' onBlur={handleLandEdit}
                        //{this.addEventListener()}
                        onKeyPress={checkEnterLand}
                        autoFocus={true} defaultValue={landmark[0] !== ""?landmark[0]:"Input Landmarks"} type='text'
                        wType="outlined" barAnimation="solid" inputClass="table-input-class" 
                    />
                   :
                   <div className="table-text"
                        onDoubleClick={switchToLandScreen}
                   >{landmark[0] !== ""?landmark[0]:"Input Landmarks"}
                   </div>
            }
            </WCol>
            <WCol size="1">
                    <WButton className="table-entry-buttons button-group" onClick={() => props.deleteItem(data, props.index)} wType="texted">
                        <i className="material-icons">close</i>
                    </WButton>
            </WCol>
        </WRow>
    );
};

export default TableEntry;