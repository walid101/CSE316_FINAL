import React, { useState } 	from 'react';
import { UPDATE }			from '../../cache/mutations';
import { WRow, WCol } from 'wt-frontend';
import { useMutation }    	from '@apollo/client';
import { useHistory, useLocation}		from "react-router-dom"
import NavbarOptions 		from '../navbar/NavbarOptions';
import Logo 				from '../navbar/Logo';
import { WNavbar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader} from 'wt-frontend';
import { WModal, WMHeader, WButton, WInput } from 'wt-frontend';
import WMFooter from 'wt-frontend/build/components/wmodal/WMFooter';
const Update = (props) => {
    let history = useHistory();
	const [input, setInput] = useState({email: props.user._id, newEmail: "", password: "", firstName: "", lastName: "" });
	const [loading, toggleLoading] = useState(false);
	const [Update] = useMutation(UPDATE);

	
	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleUpdateAccount = async (e) => {
		const {loading, error, data} = await Update({variables: {...input} });
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
        history.push("\maps", {refetchNumber: 0});
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
						user={null}
                    />
                </ul>
            </WNavbar>
        </WLHeader>
		<WModal className="signup-modal" visible = {true}>
			<WMHeader className="modal-header" onClose={() => history.push("\maps", {refetchNumber: 0})}>
				Update Account
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
							className="modal-input" onBlur={updateInput} name="newEmail" labelAnimation="up" 
							barAnimation="solid" labelText="Email Address" wType="outlined" inputType="text" 
						/>
						<div className="modal-spacer">&nbsp;</div>
						<WInput 
							className="modal-input" onBlur={updateInput} name="password" labelAnimation="up" 
							barAnimation="solid" labelText="Password" wType="outlined" inputType="password" 
						/>
					</div>
			}
			<WMFooter>
				<WButton className="modal-button" onClick={handleUpdateAccount} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Update
				</WButton>
				<WButton className="modal-button cancel-btn" onClick={() => history.push("\maps", {refetchNumber: 0})} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Cancel
				</WButton>
			</WMFooter>
		</WModal>
        </WLayout>
	);
}

export default Update;