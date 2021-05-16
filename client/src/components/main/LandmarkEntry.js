import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';
import { useHistory }		from "react-router-dom";
const TableEntry = (props) => {
    let history = useHistory();
    const { data } = props;
    const landmark = data//a landmark
    const [editingLandmark, toggleLandEdit] = useState(false);
    const checkEnterLand = (e) => {
        if(e.key === "Enter")
        {
            handleLandEdit(e);
        }
    }
    const handleLandEdit = (e) => { //add to main list
        toggleLandEdit(false);
        props.editLandmark(e.target.value, props.index);
        //console.log("not implemented yet");
    };
    /*
    const switchScreens = (e) => {
        console.log("switching screens!");
        //console.log("subReg: ", data.subRegId);
        let counter = props.pageCount+1;
        if(counter < 1000){counter = 1000;}
        history.push("/_regions", {_id: data.subRegId, regionCounter: counter, user: props.user,
                                   par_id: data.parRegId})
    };*/
    return (
        <WRow className='landmark-entry'>
            <WCol size="11">
            {
                   editingLandmark || landmark === ''
                   ? <WInput
                       className='table-input' onBlur={handleLandEdit}
                        //{this.addEventListener()}
                        onKeyPress={checkEnterLand}
                        autoFocus={true} defaultValue={landmark} type='text'
                        wType="outlined" barAnimation="solid" inputClass="table-input-class" 
                    />
                   :
                   <div className="table-text"
                        onClick={() => toggleLandEdit(!editingLandmark)}
                   >{landmark}
                   </div>
            }
            </WCol>
            <WCol size="1">
                    <WButton style={{color: "black"}} onClick={() => props.deleteLandmark(landmark, props.index)} wType="texted">
                        <i className="material-icons">close</i>
                    </WButton>
            </WCol>
        </WRow>
    );
};

export default TableEntry;