import React, { useState } 	from 'react';
import { UPDATE }			from '../../cache/mutations';
import { WRow, WCol } from 'wt-frontend';
import { useMutation }    	from '@apollo/client';
import { useHistory, useLocation}		from "react-router-dom"
import NavbarOptions 		from '../navbar/NavbarOptions';
import Logo 				from '../navbar/Logo';
import { WNavbar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader} from 'wt-frontend';
import { WModal, WMHeader, WButton, WInput, WCard} from 'wt-frontend';
import WMFooter from 'wt-frontend/build/components/wmodal/WMFooter';
import WLSide from 'wt-frontend/build/components/wlayout/WLSide';
//import WRSide from 'wt-frontend/build/components/wlayout/WRSide';
import WLMain from 'wt-frontend/build/components/wlayout/WLMain';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';
import WCContent from 'wt-frontend/build/components/wcard/WCContent';
import WCFooter from 'wt-frontend/build/components/wcard/WCFooter';
import WCHeader from 'wt-frontend/build/components/wcard/WCHeader';
import WLFooter from 'wt-frontend/build/components/wlayout/WLFooter';
const Landmarks = (props) => {
    let history = useHistory();
    let location = useLocation();
    const setShowCreate = () => {}
    const setShowLogin = () => {}
    const setActiveList = () => {}
    const refetch = () => {}
    let parentList = location.state.list; // must come from a table entry
    let itemId = location.state.itemId; // must come from a table entry
    let itemNum = 0;
    for(let i = 0; i<parentList.items.length; i++){if(parentList.items[i]._id === itemId){itemNum=i;i=parentList.items.length;}}
    //<WInput className="Landmark-input"></WInput>
	return (
        // Replace div with WModal
    <WLayout wLayout="header">
        <WLHeader>
            <WNavbar color="colored">
                <ul>
                    <WNavItem>
                        <Logo className='logo' />
                    </WNavItem>
                </ul>
                <ul>
                    <NavbarOptions
                        fetchUser={props.fetchUser} auth={true} 
                        setShowCreate={setShowCreate} setShowLogin={setShowLogin}
                        refetchTodos={refetch} setActiveList={setActiveList}
                    />
                </ul>
            </WNavbar>
        </WLHeader>
        <WLMain color="colored land-main">
            <WCard WCard="header-content-footer" className="Landmark_list">
                <WCHeader className="Landmark_list_header">
                    <h2 className="L_header-title">Region Landmarks</h2>
                </WCHeader>

                <WCFooter className = "Landmark_list_footer">
                    <i style={{fontSize: 34, paddingLeft: 15, paddingTop: 7, color: "#8b94c1"}} class="fa">&#xf036;</i>
                    <i class="fa fa-plus" aria-hidden="true" style={{fontSize: 34, paddingLeft: 15, color: "#a7dda9", cursor: "crosshair"}} onClick={()=>{console.log("Add Landmark!")}}></i>
                    <WInput className="Landmark-input"
                    autoFocus={true} placeHolder={"Enter a Landmark"} type='text'
                    >

                    </WInput>
                </WCFooter>
            </WCard>
            <WCard className="land-right-side"></WCard>
            <div className = "land-right-statements">
               <h2>Region Name: {parentList.items[itemNum].description}</h2>
               <h2>Parent Region: {parentList.name}</h2>
               <h2>Region Capital: {parentList.items[itemNum].due_date}</h2>
               <h2>Region Leader: {parentList.items[itemNum].completed}</h2>
               <h2># Of Subregions: {parentList.items.length}</h2>
            </div>
        </WLMain>
    </WLayout>
	);
}

export default Landmarks;