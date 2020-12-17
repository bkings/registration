import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';
import Toggle from './DrawerToggle/DrawerToggle';

const navigationItems = props => {
    return (
        <ul className={classes.NavigationItems}>
            <Toggle toggle={props.toggle} />
            <NavigationItem link="">Dashboard</NavigationItem>
            <NavigationItem link="">Setup</NavigationItem>
            <NavigationItem link="">Fiscal Year</NavigationItem>
            <NavigationItem link="">Document Type</NavigationItem>
            <NavigationItem link="/register-document">Register Documents</NavigationItem>
        </ul>
    )
}

export default navigationItems;