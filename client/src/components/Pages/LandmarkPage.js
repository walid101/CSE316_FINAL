import React, { useState } 	from 'react';
import { UPDATE }			from '../../cache/mutations';
import { WRow, WCol } from 'wt-frontend';
import { useMutation, useQuery }    	from '@apollo/client';
import * as mutations 					from '../../cache/mutations';
import { useHistory, useLocation}		from "react-router-dom"
import { GET_DB_TODOS } 				from '../../cache/queries';
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
import LandmarkContents from '../main/LandmarkContents';
import { UpdateListField_Transaction, 
	UpdateListItems_Transaction, 
	ReorderItems_Transaction, 
	EditItem_Transaction,
	SortItems_Transaction} 				from '../../utils/jsTPS';
const Landmarks = (props) => {
    let history = useHistory();
    let location = useLocation();
    const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);
    const [DeleteTodoItem] 			= useMutation(mutations.DELETE_ITEM);
	const [AddTodoItem] 			= useMutation(mutations.ADD_ITEM);
    const setShowCreate = () => {}
    const setShowLogin = () => {}
    const setActiveList = () => {}
    const [UpdateTodoLandField] 	= useMutation(mutations.UPDATE_LANDMARK_FIELD);

    let todolists = []
    const { loading, error, data, refetch } = useQuery(GET_DB_TODOS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { todolists = data.getAllTodos; }

    let parentList = location.state.list ? location.state.list : null; // must come from a table entry
    console.log("Parent List is: ", parentList);
    let itemId = location.state.itemId; // must come from a table entry
    let itemNum = 0;
    for(let i = 0; i<parentList.items.length; i++){if(parentList.items[i]._id === itemId){itemNum=i;i=parentList.items.length;}}
    //<WInput className="Landmark-input"></WInput>
    
    const refetchTodos = async (refetch) => {
		const { loading, error, data } = await refetch();
		if (data) {
			todolists = data.getAllTodos;
        }
	}

    const tpsUndo = async () => {
		const retVal = await props.tps.undoTransaction();
	    refetchTodos(refetch);
		return retVal;
	}
	
	const tpsRedo = async () => {
		const retVal = await props.tps.doTransaction();
		refetchTodos(refetch);
		return retVal;
	}
	const editItem = async (itemID, field, value, prev) => {
		let flag = 0;
		let transaction = new EditItem_Transaction(location.state.list._id, itemID, field, prev, value, flag, UpdateTodoLandField);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};
    const editLandmark = (landmark, index) => {
        //
        console.log("EDIT A LANDMARK!!");
        let mainItems = location.state.item;
        let prevLandmark = mainItems.landmark;
        let newLandmark = []
        for(let i = 0; i<prevLandmark.length; i++){if(i != index){newLandmark[i] = prevLandmark[i];}}
        newLandmark[index] = landmark;
        //console.log("New Landmark: ", newLandmark);
        editItem(itemId, "landmark", newLandmark, prevLandmark);
        /**Refetch the current List */
    
        //console.log("Refetching!");
        refetchTodos(refetch);
        parentList = todolists.find(list => list._id === parentList._id);
        console.log("PARENT LIST: ", parentList);
        let passItem = parentList.items[itemNum];

        history.push("/landmarks", {list: parentList, itemId: itemId, item: passItem, histCount: location.state.histCount});
        forceUpdate();
        //history.push("/landmarks", {list: parentList, itemId: itemId, item: passItem, histCount: location.state.histCount});
    }
    const deleteLandmark = (landmark, index) => {
        //
        console.log("DELETE A LANDMARK!!");
        let mainItems = location.state.item;
        let prevLandmark = mainItems.landmark;
        let newLandmark = prevLandmark.filter((land, pos)=>{if(pos!==index){return true;}return false;})
        console.log("New Landmark: ", newLandmark);
        editItem(itemId, "landmark", newLandmark, prevLandmark);
        /**Refetch the current List */
        if (parentList._id) {
            //console.log("Refetching!");
            refetchTodos(refetch);
            parentList = todolists.find(list => list._id === parentList._id);
            let passItem = parentList.items[itemNum];
            history.push("/landmarks", {list: parentList, itemId: itemId, item: passItem, histCount: location.state.histCount});
        }
    }

    const checkAddLandmark = (e) => {
        if(e.key === "Enter"){addLandmark(e);}
    }
    const addLandmark = (e) => {
        //
        console.log("ADD A LANDMARK!!");
        let mainItems = location.state.item;
        let prevLandmark = mainItems.landmark;
        let input = document.getElementById("landmark_input");
        let newLandmark = [...prevLandmark, e.target.value];
        editItem(itemId, "landmark", newLandmark, prevLandmark);
        /**Refetch the current List */
        if (parentList._id) {
            //console.log("Refetching!");
            refetchTodos(refetch);
            parentList = todolists.find(list => list._id === parentList._id);
            let passItem = parentList.items[itemNum];
            history.push("/landmarks", {list: parentList, itemId: itemId, item: passItem, histCount: location.state.histCount});
        }
    }
    const redoStyle = props.tps.hasTransactionToRedo() ? ' topArrow-white' : ' topArrow-black';
    let undoStyle = ' topArrow-white';
 
    if(props.tps.hasTransactionToUndo() === false)
    {
        undoStyle = ' topArrow-black';
    }

    const landUndo = (e) => {
        tpsUndo();
        if (parentList._id) {
            //console.log("Refetching!");
            refetchTodos(refetch);
            parentList = todolists.find(list => list._id === parentList._id);
            let passItem = parentList.items[itemNum];
            history.push("/landmarks", {list: parentList, itemId: itemId, item: passItem, histCount: location.state.histCount});
        }
    }
    const landRedo = (e) => {
        tpsRedo();
        if (parentList._id) {
            //console.log("Refetching!");
            refetchTodos(refetch);
            parentList = todolists.find(list => list._id === parentList._id);
            let passItem = parentList.items[itemNum];
            history.push("/landmarks", {list: parentList, itemId: itemId, item: passItem, histCount: location.state.histCount});
        }
    }
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
                            user={props.user}
                        />
                    </ul>
                </WNavbar>
            </WLHeader>
            <WLMain color="colored land-main">
                <WButton className={`sidebar-buttons undo-redo undo-land ${undoStyle}`} onClick={landUndo} wType="texted" clickAnimation="ripple-light" shape="rounded">
                    <i className="material-icons undo-land-styled">subdirectory_arrow_right</i>
                </WButton>
                <WButton className={`sidebar-buttons undo-redo redo redo-land " ${redoStyle}`} onClick={landRedo} wType="texted" clickAnimation="ripple-light" shape="rounded">
                    <i className="material-icons redo-land-styled">subdirectory_arrow_left</i>
                </WButton> 
                <div className="landmark-header-buttons">
                    <WButton onClick={()=>{history.push("./_regions", {regionCounter: location.state.histCount-1, _id: parentList._id})}} wType="texted" className={`table-header-button  `}>
                        <i className="material-icons close-btn">close</i>
                    </WButton>
                </div>
                <WCard WCard="header-content-footer" className="Landmark_list">
                    <WCHeader className="Landmark_list_header">
                        <h2 className="L_header-title">Region Landmarks</h2>
                    </WCHeader>
                    <WCContent>
                        <LandmarkContents
                            items={location.state.item}
                            deleteLandmark={deleteLandmark}
                            editLandmark={editLandmark}
                        >
                        </LandmarkContents>
                    </WCContent>
                    <WCFooter className = "Landmark_list_footer">
                        <i style={{fontSize: 34, paddingLeft: 15, paddingTop: 7, color: "#8b94c1"}} class="fa">&#xf036;</i>
                        <i class="fa fa-plus" aria-hidden="true" style={{fontSize: 34, paddingLeft: 15, color: "#a7dda9", cursor: "crosshair"}}></i>
                        <WInput id="landmark_input" className="Landmark-input"
                            autoFocus={true} placeHolder={"Enter a Landmark"} type='text'
                            onKeyPress={checkAddLandmark}
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