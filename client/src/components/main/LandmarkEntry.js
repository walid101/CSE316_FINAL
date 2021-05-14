import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';
import { useHistory }		from "react-router-dom";
const TableEntry = (props) => {
    let history = useHistory();
    const { data } = props;
    const landmark = data.landmark;
    const [editingLandmark, toggleLandEdit] = useState(false);
    const handleLandEdit = (e) => {
        toggleLandEdit(false);
        const newLand = e.target.value ? e.target.value : 'No Landmark';
        const prevLand = description;
        props.editItem(data._id, 'landmark', newLand, prevLand);
    };
    const checkEnterLand = (e) => {
        if(e.key === "Enter")
        {
            handleLandEdit(e);
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
    return (
        <WRow className='table-entry'>
            <WCol size="3">
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
                        onContextMenu={switchToLandScreen}
                   >{landmark}
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