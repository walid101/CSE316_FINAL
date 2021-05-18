import React            from 'react';
import TableHeader      from './TableHeader';
import TableContents    from './TableContents';

const MainContents = (props) => {
    return (
        <div className='table ' >
            <TableHeader
                addItem={props.addItem}
                sortList={props.sortList}
                clearTransactions = {props.clearTransactions}
                undo = {props.undo}
                redo = {props.redo}
                hasUndo={props.hasUndo}
                hasRedo={props.hasRedo}
                histCount={props.histCount}
                activeList={props.activeList}
                todolists={props.todolists}
                updateList={props.updateList}
            />
            <TableContents
                activeList={props.activeList}
                deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                editItem={props.editItem}
                pageCount={props.pageCount}
                histCount={props.histCount}
                caretPos={props.caretPos} handleCaret={props.handleCaret}
            />
        </div>
    );
};

export default MainContents;