import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = props => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="">Dashboard</NavigationItem>
            <NavigationItem link="">Setup</NavigationItem>
            <NavigationItem link="">Fiscal Year</NavigationItem>
            <NavigationItem link="/document-type">Document Type</NavigationItem>
            <NavigationItem link="/register-document">Register Documents</NavigationItem>
            <NavigationItem link="/logout">Logout</NavigationItem>
        </ul>
    )
}

export default navigationItems;