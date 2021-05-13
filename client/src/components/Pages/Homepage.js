import React, {useState} 	from 'react';
import Logo 							from '../navbar/Logo';
import HomePageBody						from '../intro/HomePageBody'
import NavbarOptions 					from '../navbar/NavbarOptions';
import Login 							from '../modals/Login';
import CreateAccount 					from '../modals/CreateAccount';
import { GET_DB_TODOS } 				from '../../cache/queries';
import * as mutations 					from '../../cache/mutations';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain} from 'wt-frontend';

const Homepage = (props) => {
	let todolists 							= [];
	//let ctrlPress							= 0;
	const [activeList, setActiveList] 		= useState({});
	const [showDelete, toggleShowDelete] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	//const [swapTopIndex, toggleTopIndex] 	= useState(-1);
	///const [runId, toggleRunId] 				= useState(0);	
	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);
	/*
	const [nameOfNewStateVar , nameOfFunctionThatChangesValsOfNewStateVar] = useState(initialVal);
	*/
	const [showCreate, toggleShowCreate] 	= useState(false);
	const { loading, error, data, refetch } = useQuery(GET_DB_TODOS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { todolists = data.getAllTodos; }

	const auth = props.user === null ? false : true;
	/*
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
	*/
	const setShowLogin = () => {
		toggleShowDelete(false);
		toggleShowCreate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowCreate(!showCreate);
	};
	/*
	const setShowDelete = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowDelete(!showDelete)
	};
	*/
	return (
	<WLayout wLayout="header-lside">
			<WLHeader>
				<WNavbar color="colored">
					<ul>
						<WNavItem>
							<Logo className='logo' />
						</WNavItem>
					</ul>
					<ul>
						<NavbarOptions
							fetchUser={props.fetchUser} auth={auth} 
							setShowCreate={setShowCreate} setShowLogin={setShowLogin}
							refetchTodos={refetch} setActiveList={setActiveList}
							refetchNum={0}
						/>
					</ul>
				</WNavbar>
			</WLHeader>
			<WLMain>
				<HomePageBody></HomePageBody>
			</WLMain>
			{
				showCreate && (<CreateAccount showCreate = {showCreate} fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
			}
			{
				//showLogin && 
				showLogin && (<Login showLogin = {showLogin} fetchUser={props.fetchUser} refetchTodos={refetch} setShowLogin={setShowLogin} />)
			}
		</WLayout>
	);
};
export default Homepage;