import React                    from 'react';
import { WButton, WRow, WCol }  from 'wt-frontend';

const SidebarHeader = (props) => {
    const buttonStyle = 'table-header-button ';
    /**
     *    <WButton onClick={props.setShowDelete} wType="texted" className="table-header-button">
          <i className="material-icons">delete_outline</i>
          </WButton>
     */
    return (
        <WRow className='sidebar-header'>
            <WCol size="7">
                <WButton wType="texted" hoverAnimation="text-primary" className='sidebar-header-name'>
                    Your Maps
                </WButton>
            </WCol>

            <WCol size="5">
                {
                    props.auth && <div className="sidebar-options">
                        <WButton className="sidebar-buttons" onClick={props.createNewList} clickAnimation="ripple-light" shape="rounded" color="primary">
                            <i className="material-icons">add</i>
                        </WButton>
                    </div>
                }
            </WCol>

        </WRow>

    );
};

export default SidebarHeader;