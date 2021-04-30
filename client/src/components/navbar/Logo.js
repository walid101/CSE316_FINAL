import React from 'react';
import { useHistory } from 'react-router';

const Logo = (props) => {
    let history = useHistory();
    const handleClick = (e) => {
        console.log("Logo was clicked!");
        history.push("/home");
    }
    return (
        <div className='logo' onClick = {handleClick}>
            World Data Mapper
        </div>
    );
};

export default Logo;