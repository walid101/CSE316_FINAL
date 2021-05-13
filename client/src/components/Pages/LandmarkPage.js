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
    const setShowCreate = () => {}
    const setShowLogin = () => {}
    const setActiveList = () => {}
    const refetch = () => {}
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
                    <i class="fa fa-plus" aria-hidden="true" style={{fontSize: 34, paddingLeft: 15, color: "#a7dda9"}}></i>
                    <WInput className="Landmark-input"></WInput>
                </WCFooter>
            </WCard>
            <WCard className="land-right-side"></WCard>
            <div className = "land-right-statements">
               <h2>Region Name: </h2>
               <h2>Parent Region: </h2>
               <h2>Region Capital: </h2>
               <h2>Region Leader: </h2>
               <h2># Of Subregions: </h2>
            </div>
        </WLMain>
    </WLayout>
	);
}

export default Landmarks;