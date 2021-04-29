import React            from 'react';
import TableHeader      from '../main/TableHeader';
import TableContents    from '../main/TableContents';

const Regions = (props) => {
    return (
        <div className='table ' >
            <TableHeader
                disabled={!props.activeList._id} addItem={props.addItem}
                setShowDelete={props.setShowDelete} setActiveList={props.setActiveList}
                sortList={props.sortList}
                clearTransactions = {props.clearTransactions}
                undo = {props.undo}
                redo = {props.redo}
                hasUndo={props.hasUndo}
                hasRedo={props.hasRedo}
            />
            <TableContents
                key={props.activeList.id} activeList={props.activeList}
                deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                editItem={props.editItem}
                topId = {props.topId}
            />
        </div>
    );
};

export default Regions;