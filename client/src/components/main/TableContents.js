import React        from 'react';
import TableEntry   from './TableEntry';

const TableContents = (props) => {
    //console.log("activelist in tableContents: ", props.activeList);
    const entries = props.activeList ? props.activeList.items : null;
    return (
        entries ? <div className=' table-entries container-primary'>
            {
                entries.map((entry, index) => (
                    <TableEntry
                        data={entry} key={entry.id}
                        deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                        editItem={props.editItem}
                        index={index}
                        activeList = {props.activeList}
                        pageCount={props.pageCount}
                        histCount={props.histCount}
                        caretPos={props.caretPos} handleCaret={props.handleCaret}
                    />
                ))
            }

            </div>
            : <div className='container-primary' />
    );
};

export default TableContents;