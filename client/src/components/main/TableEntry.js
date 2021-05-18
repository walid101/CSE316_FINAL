import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';
import { useHistory }		from "react-router-dom";
import logo from './The World/Asia/Afghanistan Flag.png';
const TableEntry = (props) => {
    let history = useHistory();
    const { data } = props;
    let moveUpColor = ' topArrow-white';
    let moveDownColor = ' topArrow-white';
    let mainLogo = null;
    let mainLogoPath = null;
    let itemPos = -1;
    const images = require.context('./', true);
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
    //use props.activeList for file path name!
    let mainPath = "";
    let fileExists = false;
    let thisList = props.activeList;
    for(let i = 0; i<thisList.path.length; i++)
    {
        if(i != thisList.path.length -1)
        {
            mainPath+=thisList.path[i] + "/";
        }
        else
        {
            mainPath+=thisList.path[i];
        }
    }
    console.log("CARET POS:" , props.caretPos);
    //console.log("MAIN PATH: ", mainPath);//works
    //const getLogo = async (imageName) => {await import(`${imageName}`); return logo;}
    const getImage = async (filePath) => {
        const file = await import(`./${mainPath} Flag.png`);
        return file;
    }
    fileExists = checkFileExist(`./${mainPath} Flag.png`);
    
    if(fileExists) {
        mainLogo = getImage(`./${mainPath} Flag.png`);
        //console.log("DEFAULT::: ", mainLogo.default);
    }

    
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
            props.handleCaret([-1,-1]);
        }
    }
    const checkEnterDate = (e) => {
        if(e.key === "Enter")
        {
            handleDateEdit(e);
            props.handleCaret([-1,-1]);
        }
    }
    const checkEnterStat = (e) => {
        if(e.key === "Enter")
        {
            handleStatusEdit(e);
            props.handleCaret([-1,-1]);
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
    const handleArrowPress = (e, pos) => {
        if(itemPos == 0){handleDescrEdit(e);}
        if(itemPos == 1){handleDateEdit(e);}
        if(itemPos == 2){handleStatusEdit(e);}
        console.log("KEY PRESSED");
        let newArr = props.caretPos;
        if(e.keyCode === 38)//up
        {
            console.log("UP");
            newArr[1] = newArr[1] - 1;//up       
        }
        else if(e.keyCode === 40)//down
        {
            console.log("DOWN");
            newArr[1] = newArr[1] + 1;//down
        }
        else if(e.keyCode === 37)//left
        {
            console.log("LEFT");
            newArr[0] = newArr[0] - 1;//left
        }
        else if(e.keyCode === 39)//right
        {
            console.log("RIGHT");
            newArr[0] = newArr[0] + 1;//right
        }
        if(newArr[0] <= -1){newArr[0] = 0;}
        if(newArr[1] <= -1){newArr[1] = 0;}
        if(newArr[0] >= 3){newArr[0] = 2;}
        if(newArr[1] >= props.activeList.items.length){newArr[1] = props.activeList.items.length-1;}
        props.handleCaret(newArr);
    }
    const descCaret = () => {
        toggleDescrEdit(!editingDescr); 
        checkCaretPos(0);
    }
    const checkCaretPos = (e) => {
        let newArr = new Array(2);
        newArr[0] = e;
        newArr[1] = props.index;
        props.handleCaret(newArr);
    }
    const inCaret = (e) => {
        //e tells us the X position
        let karet = props.caretPos;
        if(karet[0] === e && karet[1] === props.index){
            console.log("KARET ON! : ", props.caretPos);
            return true;
        }
        return false;
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
    const itemPosDesc = (e) => {itemPos = 0;}
    const itemPosDate = (e) => {itemPos = 1;}
    const itemPosStat = (e) => {itemPos = 2;}
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
    function checkFileExist(urlToFile) {
        var xhr = new XMLHttpRequest();
        xhr.open('HEAD', urlToFile, false);
        xhr.send();
            
        if (xhr.status == "404") {
            return false;
        } else {
            return true;
        }
    }
    return (
        <WRow className='table-entry'>
            <WCol size="2">
            {
                editingDescr || description === '' || inCaret(0)
                    ? <WInput
                        className='table-input' onBlur={handleDescrEdit}
                        //{this.addEventListener()}
                        onKeyPress={checkEnterDesc}
                        autoFocus={true} defaultValue={description} type='text'
                        wType="outlined" barAnimation="solid" inputClass="table-input-class"
                        onKeyUp={handleArrowPress}
                        onKeyDown={itemPosDesc}
                    />
                    : <div className="table-text"
                        onContextMenu={switchScreens}
                        onClick={descCaret}
                    >{description}
                    </div>
            }
            </WCol>

            <WCol size="2">
                {
                    editingDate || inCaret(1) ? <WInput
                        className='table-input' onBlur={handleDateEdit}
                        onKeyPress={checkEnterDate}
                        autoFocus={true} defaultValue={due_date} type='text'
                        wType="outlined" barAnimation="solid" inputClass="table-input-class"
                        onKeyUp={handleArrowPress}
                        onKeyDown={itemPosDate}
                    />
                        : <div className="table-text"
                            onClick={() => {toggleDateEdit(!editingDate);checkCaretPos(1);}}
                        >{due_date}
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    editingStatus || inCaret(2) ? <WInput
                        className='table-input' onBlur={handleStatusEdit}
                        onKeyPress={checkEnterStat} type='text'
                        autoFocus={true} defaultValue={status} type='text'
                        wType="outlined" barAnimation="solid" inputClass="table-input-class"
                        onKeyUp={handleArrowPress}
                        onKeyDown={itemPosStat}
                    >
                    </WInput>
                        : <div className="table-text"
                            onClick={() => {toggleStatusEdit(!editingStatus);checkCaretPos(2);}}>
                            {status}
                        </div>
                }
            </WCol>
            <WCol size = "2">
            {
                fileExists === false
                ? <div className="table-text">
                {"No Flag"}
                </div>
                :<img className="flag-layout" src = {getImage(`./${mainPath} Flag.png`)} width={40} height={40}/>
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