import React from 'react';
import { useHistory } from 'react-router';

const Logo = (props) => {
    let history = useHistory();
    let showWorld = 0;
    console.log("making logo");
    try {
        showWorld = props.displayWorld;//showWorld = 1
    } catch(e) {
        showWorld = 0;
    }
    const handleClick = (e) => {
        console.log("Logo was clicked!");
        history.push("/maps");
    }
    const show = showWorld == 1? true : false;
    return (
        <div className='logo' onClick = {handleClick}>
            World Data Mapper
            {
                show && <><i className="material-icons">subdirectory_arrow_right</i>{props.activeList.name}</>
            }
        </div>
    );
};

export default Logo;