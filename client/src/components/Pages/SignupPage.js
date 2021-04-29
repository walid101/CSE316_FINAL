import React, { useState } 	from 'react';
import { REGISTER }			from '../../cache/mutations';
import { WRow, WCol } from 'wt-frontend';
import { useMutation }    	from '@apollo/client';
import { useHistory, useLocation}		from "react-router-dom"
import NavbarOptions 		from '../navbar/NavbarOptions';
import Logo 				from '../navbar/Logo';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput } from 'wt-frontend';
const CreateAccount = (props) => {
    let history = useHistory();
	const [input, setInput] = useState({ email: '', password: '', firstName: '', lastName: '' });
	const [loading, toggleLoading] = useState(false);
	const [Register] = useMutation(REGISTER);

	
	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleCreateAccount = async (e) => {
		for (let field in input) {
			if (!input[field]) {
				alert('All fields must be filled out to register');
				return;
			}
		}
		const { loading, error, data } = await Register({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			console.log(data)
			toggleLoading(false);
			if(data.register.email === 'already exists') {
				alert('User with that email already registered');
			}
			else {
				props.fetchUser();
			}

		};
        history.push("/home");
	};

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
		<WModal className="signup-modal" visible = {true}>
			<WMHeader className="modal-header" onClose={() => history.push("/home")}>
				Sign Up
			</WMHeader>
			{
				loading ? <div />
					: <div>
						<WRow className="modal-col-gap signup-modal">
							<WCol size="6">
								<WInput 
									className="" onBlur={updateInput} name="firstName" labelAnimation="up" 
									barAnimation="solid" labelText="First Name" wType="outlined" inputType="text" 
								/>
							</WCol>
							<WCol size="6">
								<WInput 
									className="" onBlur={updateInput} name="lastName" labelAnimation="up" 
									barAnimation="solid" labelText="Last Name" wType="outlined" inputType="text" 
								/>
							</WCol>
						</WRow>

						<div className="modal-spacer">&nbsp;</div>
						<WInput 
							className="modal-input" onBlur={updateInput} name="email" labelAnimation="up" 
							barAnimation="solid" labelText="Email Address" wType="outlined" inputType="text" 
						/>
						<div className="modal-spacer">&nbsp;</div>
						<WInput 
							className="modal-input" onBlur={updateInput} name="password" labelAnimation="up" 
							barAnimation="solid" labelText="Password" wType="outlined" inputType="password" 
						/>
					</div>
			}
			<WButton className="modal-button" onClick={handleCreateAccount} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
				Submit
			</WButton>
		</WModal>
        </WLayout>
	);
}

export default CreateAccount;