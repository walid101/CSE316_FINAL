import React 			from 'react';
import Homescreen 		from './components/homescreen/Homescreen';
import Homepage			from './components/Pages/Homepage';
import Login			from './components/Pages/LoginPage';
import Signup			from './components/Pages/SignupPage';
import Update 			from './components/Pages/UpdatePage';
import Regions			from './components/Pages/RegionsPage';
import { useQuery } 	from '@apollo/client';
import * as queries 	from './cache/queries';
import { jsTPS } 		from './utils/jsTPS';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
const App = () => {
	let user = null;
    let transactionStack = new jsTPS();
    const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER);

    if(error) { console.log(error); }
	if(loading) { console.log(loading); }
	if(data) { 
		let { getCurrentUser } = data;
		if(getCurrentUser !== null) { user = getCurrentUser; }
    }
//<Redirect exact from="/" to={ {pathname: "/regions"} } /> ->before <Route to regions
	return(
		<Router>
			<Switch>
				<Redirect exact from="/" to={ {pathname: "/home"} } />
				<Route 
					path="/home" 
					name="home" 
					render={() => 
						<Homepage tps={transactionStack} fetchUser={refetch} user={user} />
					} 
				/>
				<Route 
					path="/maps" 
					name="maps" 
					render={() => 
						<Homescreen tps={transactionStack} fetchUser={refetch} user={user} />
					} 
				/>
				<Route 
					path="/login" 
					name="login" 
					render={() => 
						<Login fetchUser={refetch} user={user} />
					} 
				/>
				<Route 
					path="/signup" 
					name="signup" 
					render={() => 
						<Signup fetchUser={refetch} user={user} />
					} 
				/>
				<Route 
					path="/changeInfo" 
					name="changeInfo" 
					render={() => 
						<Update fetchUser={refetch} user={user} />
					} 
				/>
				<Route 
					path="/_regions" 
					name="_regions" 
					render={() => 
						<Regions fetchUser={refetch} user={user} />
					} 
				/>
				<Route/>
			</Switch>
		</Router>
	);
}

export default App;