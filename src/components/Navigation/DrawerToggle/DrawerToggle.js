import React from 'react';
import classes from './DrawerToggle.module.css';

const drawerToggle = (props) => {
    let assignedClasses = [classes.DrawerToggle, classes.Open];
    if (!props.isOpen) {
        assignedClasses = [classes.DrawerToggle, classes.Close];
    }
    return (
        <div className={assignedClasses.join(" ")} onClick={props.toggle} >
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default drawerToggle;