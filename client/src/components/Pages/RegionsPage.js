import React, {useState, useEffect } 	from 'react';
import Logo 							from '../navbar/Logo';
import NavbarOptions 					from '../navbar/NavbarOptions';
import MainContents 					from '../main/MainContents';
import SidebarContents 					from '../sidebar/SidebarContents';
import Login 							from '../modals/Login';
import Delete 							from '../modals/Delete';
import Update 							from '../modals/Update';
import CreateAccount 					from '../modals/CreateAccount';
import { GET_DB_TODOS } 				from '../../cache/queries';
import * as mutations 					from '../../cache/mutations';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import { useLocation, useHistory }		from "react-router-dom";
import MapChart 						from '../Maps/MapCharts';
import ReactTooltip from "react-tooltip";
import { UpdateListField_Transaction, 
	UpdateListItems_Transaction, 
	ReorderItems_Transaction, 
	EditItem_Transaction,
	SortItems_Transaction} 				from '../../utils/jsTPS';
const Regions = (props) => {
    let history = useHistory();
	let location = useLocation();
	let todolists 							= [];
	let ctrlPress							= 0;
	const [content, setContent] 			= useState("");
	const [activeList, setActiveList] 		= useState({});
	const [showDelete, toggleShowDelete] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [swapTopIndex, toggleTopIndex] 	= useState(-1);
	const [runId, toggleRunId] 				= useState(0);	
	const [runSubId, toggleRunSubId]		= useState(0);//resets list ID
	const [showUpdate, toggleShowUpdate]	= useState(false);
	const [refetchCount, toggleRefresh] 	= useState(0);
	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);
	/*
	const [nameOfNewStateVar , nameOfFunctionThatChangesValsOfNewStateVar] = useState(initialVal);
	*/
	const [showCreate, toggleShowCreate] 	= useState(false);
    const [regionPageCount, toggleRegionPage] = useState(0);
	const [reloadPageCount, toggleReloadPage] = useState(0);
	const [reloadHistoryCount, toggleReloadHistory] = useState(0);
	const [parReg, toggleParReg]					= useState("");
	const [ReorderTodoItems] 		= useMutation(mutations.REORDER_ITEMS);
	const [UpdateTodoItemField] 	= useMutation(mutations.UPDATE_ITEM_FIELD);
	const [DeleteTodoItem] 			= useMutation(mutations.DELETE_ITEM);
	const [AddTodoItem] 			= useMutation(mutations.ADD_ITEM);
	const [SortItems] 				= useMutation(mutations.SORT_ITEMS);
	const [DeleteTodolist] 			= useMutation(mutations.DELETE_TODOLIST);//when we add Item
	const [AddTodolist] 			= useMutation(mutations.ADD_TODOLIST);//when we delete Item
	//const [SwapTopList]				= useMutation(mutations.SWAP_TOP);

	const { loading, error, data, refetch } = useQuery(GET_DB_TODOS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { todolists = data.getAllTodos; }

	const auth = location.state.user === null ? false : true;
    if(location.state.regionCounter % 2 == 0 && location.state.regionCounter < 1000 &&
	   location.state.regionCounter >= 0 && regionPageCount % 2 == 0)
    {
        console.log("getting state id from location!");
        let list = todolists.find(list => list._id === location.state._id);
        setActiveList(list);
        toggleRegionPage(regionPageCount+1);
    }
	if(reloadPageCount < location.state.regionCounter &&
	   location.state.regionCounter >= 0)//root 
	{
		console.log("Reload Region!");
        let list = todolists.find(list => list._id === location.state._id);
        setActiveList(list);
		console.log("list: ", list);
		toggleParReg(location.state.par_id);//this is for the future gen // for going back
		toggleReloadPage(location.state.regionCounter);
		//forceUpdate();
	}
	if(reloadHistoryCount > location.state.regionCounter)//reloadHist Starts at 0!
	{
		console.log("Go Back!");
        let list = todolists.find(list => list._id === location.state._id);
        setActiveList(list);
		console.log("list: ", list);
		toggleReloadHistory(location.state.regionCounter);//it will be negative!
	}
	const refetchTodos = async (refetch) => {
		const { loading, error, data } = await refetch();
		if (data) {
			todolists = data.getAllTodos;
			if (activeList._id) {
				let tempID = activeList._id;
				let list = todolists.find(list => list._id === tempID);
				setActiveList(list);
			}
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

    const clearTransactions = async () => {
		props.tps.clearAllTransactions();
	}

	// Creates a default item and passes it to the backend resolver.
	// The return id is assigned to the item, and the item is appended
	// to the local cache copy of the active todolist. 
	const addItem = async () => {
		let list = activeList;
        //console.log("activeList is: ", list);
		console.log("addItem!");
		const items = list.items;
		//const lastID = items.length >= 1 ? items[items.length - 1].id + 1 : 0;
		const id = runSubId;
		toggleRunSubId(runSubId+1);
		const lastID = runId;
		toggleRunId(runId + 1);
		//console.log("LAST IF IS: ", lastID);
		//we need to create a new list? , when we delete Item, we need to delete a new List as well?
		let newList = {
			_id: '',
			id: id,
			name: 'Untitled',
			owner: props.user._id,
			items: [],
			level: list.level + 1
		}
		const { data } = await AddTodolist({ variables: { todolist: newList }, refetchQueries: [{ query: GET_DB_TODOS }] });
		const newItem = {
			_id: '',
			id: lastID,
			description: 'Input Name',
			due_date: 'Input Capital',
			assigned_to: "Input Flag",
			completed: "Input Leader",
            landmark: "Input Landmark",
			parRegId: list._id,
			subRegId: data.addTodolist
		};
		let opcode = 1;
		let itemID = newItem._id;
		let listID = activeList._id;
		let transaction = new UpdateListItems_Transaction(listID, itemID, newItem, opcode, AddTodoItem, DeleteTodoItem);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};


	const deleteItem = async (item, index) => {
		console.log("deleteItem!");
		let listID = activeList._id;
		let itemID = item._id;
		let opcode = 0;
		//DeleteTodolist({ variables: { _id: item.subRegId }, refetchQueries: [{ query: GET_DB_TODOS }] });
		let itemToDelete = {
			_id: item._id,
			id: item.id,
			description: item.description,
			due_date: item.due_date,
			assigned_to: item.assigned_to,
			completed: item.completed,
			landmark: item.landmark,
			parRegId: item.parRegId,
			subRegId: item.subRegId
		}
		let transaction = new UpdateListItems_Transaction(listID, itemID, itemToDelete, opcode, AddTodoItem, DeleteTodoItem, index);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

	const editItem = async (itemID, field, value, prev) => {
		let flag = 0;
		//if (field === 'completed') flag = 1;
        console.log("in EditItem!");
		let listID = activeList._id;
		let transaction = new EditItem_Transaction(listID, itemID, field, prev, value, flag, UpdateTodoItemField);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};

	const reorderItem = async (itemID, dir) => {
		//console.log(activeList.items);
		let listID = activeList._id;
		let transaction = new ReorderItems_Transaction(listID, itemID, dir, ReorderTodoItems);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};
	//when the user clicks, threading -> multiple at once
	const sortAllItems = async (colNum, clickNum) => {
		if(activeList.items !== undefined)
		{	
			let listID = activeList._id;
			let arr = [];
			for(let i = 0; i<activeList.items.length; i++)
			{
				arr.push(activeList.items[i].id);
			}
			let transaction = new SortItems_Transaction(listID, colNum, clickNum, arr, SortItems);
			props.tps.addTransaction(transaction);
			//console.log(colNum);
			tpsRedo();//do transaction
		}	
	}

    
	const handleSetActive = (id) => {
		const todo = todolists.find(todo => todo.id === id || todo._id === id);
		setActiveList(todo);
	};

	const setShowLogin = () => {
		toggleShowDelete(false);
		toggleShowCreate(false);
		toggleShowUpdate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowUpdate(false);
		toggleShowCreate(!showCreate);
	};

	const setShowUpdate = () => {
		//console.log("updating....");
		toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowCreate(false);
		toggleShowUpdate(!showUpdate);
	};

	const setShowDelete = () => {
		console.log("Deleting...");
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowUpdate(false);
		toggleShowDelete(!showDelete)
	};


	const handleKeyPress = (event) => {
		if(event.key === "Control")
		{
			//console.log("changing ctrlPress to 1!");
			ctrlPress = 1;
		}
		else if(ctrlPress === 1 && event.key === "z")
		{
			tpsUndo();
		}
		else if(ctrlPress === 1 && event.key === "y")
		{
			tpsRedo();
		}
		else {ctrlPress = 0;}
	}
    return (
        <>
            <WLHeader>
                    <WNavbar color="colored">
                        <ul>
                            <WNavItem>
                                <Logo className='logo' displayWorld={1} activeList={activeList}/>
                            </WNavItem>
                        </ul>
                        <ul>
                            <NavbarOptions
                                fetchUser={props.fetchUser} auth={auth} 
                                setShowUpdate={setShowUpdate} setShowDelete={setShowDelete}
                                setShowCreate={setShowCreate} setShowLogin={setShowLogin}
                                refetchTodos={refetch} setActiveList={setActiveList}
                                user={location.state.user}
                                refetchNum = {refetchCount}
                            />
                        </ul>
                    </WNavbar>
                </WLHeader>
                <WLMain>
                    {
                        activeList ? 
                                <div className="container-secondary">
                                    <MainContents
										parReg={parReg}
                                        clearTransactions={clearTransactions}
                                        addItem={addItem} deleteItem={deleteItem}
                                        editItem={editItem} reorderItem={reorderItem}
                                        sortList = {sortAllItems}
                                        undo={tpsUndo} redo={tpsRedo}
                                        hasUndo={props.tps.hasTransactionToUndo()}
                                        hasRedo={props.tps.hasTransactionToRedo()}
                                        activeList={activeList}
										pageCount={reloadPageCount}
										histCount={reloadHistoryCount}
                                    />
                                </div>
                            :
                                <div className="container-secondary" />
                    }
            </WLMain>
			{
				showCreate && (<CreateAccount showCreate = {showCreate} fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
			}

			{
				showLogin && (<Login showLogin = {showLogin} fetchUser={props.fetchUser} refetchTodos={refetch}setShowLogin={setShowLogin} />)
			}
			{
				showUpdate && (<Update user={location.state.user} showUpdate = {showUpdate} fetchUser={props.fetchUser} refetchTodos={refetch} setShowUpdate={setShowUpdate}/>)
			}
        </>
    );
};

export default Regions;