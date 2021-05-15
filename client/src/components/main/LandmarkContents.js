import React        from 'react';
import LandmarkEntry   from './LandmarkEntry';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';
import { useHistory }		from "react-router-dom";
const LandmarkContents = (props) => {
    //console.log("activelist in tableContents: ", props.activeList);
    const entries = props.items ? props.items.landmark : null;
    /*deleteItem={props.deleteItem} reorderItem={props.reorderItem}
    editItem={props.editItem} activeList = {props.activeList}*/
    console.log("In LandmarkContents!!!");
    console.log("Items is: ", props.items);
    const filterFunc = (elem) =>
    {
        return elem!=="";
    }
    return (
        entries ? <div className=' table-entries container-primary'>
            {
                entries.filter(filterFunc).map((entry, index) => (
                    <LandmarkEntry
                        data={entry} key={entry.id}
                        index={index}
                    />
                ))
            }

            </div>
            : <div className='container-primary' />
    );
};

export default LandmarkContents;