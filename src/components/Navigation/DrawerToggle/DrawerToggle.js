import React from 'react';
import classes from './DrawerToggle.module.css';

const drawerToggle = (props) => {
    console.log('toggle ', props.toggle);
    return (
        <div className={classes.DrawerToggle} onClick={props.toggle} >
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default drawerToggle;