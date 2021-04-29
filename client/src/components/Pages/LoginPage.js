import React, { useState } 	from 'react';
import { LOGIN } 			from '../../cache/mutations';
import { useMutation}    	from '@apollo/client';
import { useHistory, useLocation}		from "react-router-dom"
import NavbarOptions 		from '../navbar/NavbarOptions';
import Logo 				from '../navbar/Logo';
import { WNavbar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader } from 'wt-frontend';
import { WModal, WMHeader, WMFooter, WButton, WInput } from 'wt-frontend';
const Login = (props) => {
    let location = useLocation();
	const [, updateState] = React.useState();
    //const forceUpdate = React.useCallback(() => updateState({}), []);
	const [input, setInput] = useState({ email: '', password: '' });
	const [loading, toggleLoading] = useState(false);
	const [showErr, displayErrorMsg] = useState(false);
	const errorMsg = "Email/Password not found.";
	const [Login] = useMutation(LOGIN);
	let history = useHistory();
	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	}

	const handleLogin = async (e) => {

		const { loading, data } = await Login({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (data.login._id === null) {
			displayErrorMsg(true);
			return;
		}
		if (data) {
			props.fetchUser();
			//props.refetchTodos();
			//console.log("refetch number is: ", location.state.refetchNumber);
			toggleLoading(false);
			history.push("/maps", {refetchNumber: location.state.refetchNumber+1});
			//forceUpdate();
		};
	};
    //Stubs because background wont be touchable
    const auth = false;
    const setShowCreate = () => {}
    const setShowLogin = () => {}
    const setActiveList = () => {}
    const refetch = () => {}
	return (
        // Replace div with WModal
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
                    />
                </ul>
            </WNavbar>
        </WLHeader>
		<WModal className="login-modal" visible = {true}>
			<WMHeader className="modal-header" onClose={() => history.push("/home")}>
				Login
			</WMHeader>

			{
				loading ? <div />
					: <div className="main-login-modal">

						<WInput className="modal-input" onBlur={updateInput} name='email' labelAnimation="up" barAnimation="solid" labelText="Email Address" wType="outlined" inputType='text' />
						<div className="modal-spacer">&nbsp;</div>
						<WInput className="modal-input" onBlur={updateInput} name='password' labelAnimation="up" barAnimation="solid" labelText="Password" wType="outlined" inputType='password' />

						{
							showErr ? <div className='modal-error'>
								{errorMsg}
							</div>
								: <div className='modal-error'>&nbsp;</div>
						}

					</div>
			}
			<WMFooter>
				<WButton className="modal-button" onClick={handleLogin} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Login
				</WButton>
			</WMFooter>
		</WModal>
        </WLayout>
	);
}

export default Login;