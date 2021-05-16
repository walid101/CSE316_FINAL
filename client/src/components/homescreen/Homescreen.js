import React, {useState, useEffect } 	from 'react';
import Logo 							from '../navbar/Logo';
import NavbarOptions 					from '../navbar/NavbarOptions';
//import MainContents 					from '../main/MainContents';
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
//import WInput from 'wt-frontend/build/components/winput/WInput';

const Homescreen = (props) => {
	let history = useHistory();
	let location = useLocation();
	let todolists 							= [];
	let ctrlPress							= 0;
	const [content, setContent] 			= useState("");
	const [activeList, setActiveList] 		= useState({});
	const [showDelete, toggleShowDelete] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [swapTopIndex, toggleTopIndex] 	= useState(-1);
	const [newListMade, toggleNewList]		= useState(false);
	const [runListId, toggleRunListId]		= useState(0);
	const [showUpdate, toggleShowUpdate]	= useState(false);
	const [refetchCount, toggleRefresh] 	= useState(0);
	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);
	/*
	const [nameOfNewStateVar , nameOfFunctionThatChangesValsOfNewStateVar] = useState(initialVal);
	*/
	const [showCreate, toggleShowCreate] 	= useState(false);

	const [ReorderTodoItems] 		= useMutation(mutations.REORDER_ITEMS);
	const [UpdateTodoItemField] 	= useMutation(mutations.UPDATE_ITEM_FIELD);
	const [UpdateTodolistField] 	= useMutation(mutations.UPDATE_TODOLIST_FIELD);
	const [DeleteTodolist] 			= useMutation(mutations.DELETE_TODOLIST);
	const [DeleteTodoItem] 			= useMutation(mutations.DELETE_ITEM);
	const [AddTodolist] 			= useMutation(mutations.ADD_TODOLIST);
	const [AddTodoItem] 			= useMutation(mutations.ADD_ITEM);
	const [SortItems] 				= useMutation(mutations.SORT_ITEMS);
	//const [SwapTopList]				= useMutation(mutations.SWAP_TOP);

	const { loading, error, data, refetch } = useQuery(GET_DB_TODOS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { todolists = data.getAllTodos; }

	const auth = props.user === null ? false : true;
	console.log("USER: ", props.user);
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
	if(location.state != null && location.state.refetchNumber % 2 == 1 && refetchCount % 2 == 0)
	{
		toggleRefresh(refetchCount + 1);
		refetchTodos(refetch);
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
	const createNewList = async () => {
		const length = todolists.length
		const id = runListId;
		toggleRunListId(runListId+1);
		let list = {
			_id: '',
			id: id,
			name: 'Untitled',
			owner: props.user._id,
			items: [],
			level: 0,
			parentId: "-1" //no parent for root level
		}
		const { data } = await AddTodolist({ variables: { todolist: list }, refetchQueries: [{ query: GET_DB_TODOS }] });
		console.log("ListId is: ", data.addTodolist);
		setActiveList(list);
		toggleNewList(true);
		props.tps.clearAllTransactions();
	};

	const deleteList = async (_id) => {
		props.tps.clearAllTransactions();
		toggleTopIndex(-1);
		DeleteTodolist({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_TODOS }] });
		refetch();
		setActiveList({});
	};

	const updateListField = async (_id, field, value, prev) => {
		let transaction = new UpdateListField_Transaction(_id, field, prev, value, UpdateTodolistField);
		props.tps.addTransaction(transaction);
		tpsRedo();
		//UpdateTodolistField({ variables: { _id: _id, field: field, value: value }});
	};
	const swapToTop = async (swapId) =>
	{
		let index = -1;
		//console.log("todolistlength: ", todolists.length);
		for(let i = 0; i<todolists.length; i++)
		{
			if(todolists[i].id === swapId)
			{
				index = i;
				i = todolists.length;
			}
		}
		toggleTopIndex(index);
		//console.log("swapTopIndex: ", swapTopIndex);
		forceUpdate();
		//switch screens history.push("\_regions", todo);
	};
	const handleSetActive = (id) => {
		const todo = todolists.find(todo => todo.id === id || todo._id === id);
		console.log("id is: ", id);
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

	const setShowDelete = (listId) => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowUpdate(false);
		toggleShowDelete(!showDelete);
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
	/*
		<WLMain>
				{
					activeList ? 
							<div className="container-secondary">
								<MainContents
									clearTransactions={clearTransactions}
									addItem={addItem} deleteItem={deleteItem}
									editItem={editItem} reorderItem={reorderItem}
									setShowDelete={setShowDelete} sortList = {sortAllItems}
									activeList={activeList} setActiveList={setActiveList}
									undo={tpsUndo} redo={tpsRedo}
									hasUndo={props.tps.hasTransactionToUndo()}
									hasRedo={props.tps.hasTransactionToRedo()}
								/>
							</div>
						:
							<div className="container-secondary" />
				}

			</WLMain>
	*/ 
	return (
		<WLayout wLayout="header-lside">
			<WLHeader>
				<WNavbar color="colored">
					<ul>
						<WNavItem>
							<Logo className='logo'/>
						</WNavItem>
					</ul>
					<ul>
						<NavbarOptions
							fetchUser={props.fetchUser} auth={auth} 
							setShowUpdate={setShowUpdate} setShowDelete={setShowDelete}
							setShowCreate={setShowCreate} setShowLogin={setShowLogin}
							refetchTodos={refetch} setActiveList={setActiveList}
							refetchNum = {refetchCount}
							user={props.user}
						/>
					</ul>
				</WNavbar>
			</WLHeader>
			<WLSide side="left">
				<WSidebar className = "main-sidebar">
					{
						activeList ?
							<SidebarContents
								_activeid={activeList._id}
								todolists={todolists} activeid={activeList.id} auth={auth}
								handleSetActive={handleSetActive} createNewList={createNewList}
								undo={tpsUndo} redo={tpsRedo}
								updateListField={updateListField}
								swapToTop = {swapToTop}
								handleKeyPress = {handleKeyPress}
								setShowDelete = {setShowDelete}
								user={props.user}
							/>
							:
							<></>
					}
				</WSidebar>
			</WLSide>		
			<WLMain>
				<MapChart setTooltipContent={setContent} />
				<ReactTooltip>{content}</ReactTooltip>
			</WLMain>	
			{
				showDelete && (<Delete showDelete = {showDelete} deleteList={deleteList} activeid={activeList._id} setShowDelete={setShowDelete} />)
			}

			{
				showCreate && (<CreateAccount showCreate = {showCreate} fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
			}

			{
				showLogin && (<Login showLogin = {showLogin} fetchUser={props.fetchUser} refetchTodos={refetch}setShowLogin={setShowLogin} />)
			}
			{
				showUpdate && (<Update user={props.user} showUpdate = {showUpdate} fetchUser={props.fetchUser} refetchTodos={refetch} setShowUpdate={setShowUpdate}/>)
			}

		</WLayout>
	);
};

export default Homescreen;