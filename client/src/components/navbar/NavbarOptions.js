import React , {useState, useEffect }   	from 'react';
import { LOGOUT }                           from '../../cache/mutations';
import { useMutation, useApolloClient }     from '@apollo/client';
import { WButton, WNavItem }                from 'wt-frontend';
import { useHistory }		from "react-router-dom"
const LoggedIn = (props) => {
    const client = useApolloClient();
	const [Logout] = useMutation(LOGOUT);
    let history = useHistory();
    const handleLogout = async (e) => {
        Logout();
        const { data } = await props.fetchUser();
        if (data) {
            let reset = await client.resetStore();
            if (reset) props.setActiveList({});
        }
        history.push("/home");
    };
    return (
        <>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={handleLogout} wType="texted" hoverAnimation="text-primary">
                    Logout
                </WButton>
            </WNavItem >
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-update-options" onClick={() => {history.push("\changeInfo")}} wType="texted" hoverAnimation="text-primary">
                    Update
                </WButton>
            </WNavItem>
        </>
    );
};

const LoggedOut = (props) => {
    let history = useHistory();
    
    return (
        <>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={() => {history.push("\login", {refetchNumber: props.refetchNum})}} wType="texted" hoverAnimation="text-primary">
                    Login
                </WButton>
            </WNavItem>
            <WNavItem hoverAnimation="lighten">
                <WButton className="sign-up" onClick={() => {history.push("\signup")}} wType="texted" hoverAnimation="text-primary"> 
                    Sign Up 
                </WButton>
            </WNavItem>
        </>
    );
};


const NavbarOptions = (props) => {
    //console.log("in navbarOptions: refetchNum is: ", props.refetchNum);
    return (
        <>
            {
                props.auth === false ? <LoggedOut refetchNum = {props.refetchNum} setShowLogin={props.setShowLogin} setShowCreate={props.setShowCreate} />
                : <LoggedIn setShowUpdate = {props.setShowUpdate} fetchUser={props.fetchUser} setActiveList={props.setActiveList} logout={props.logout} />
            }
        </>

    );
};

export default NavbarOptions;