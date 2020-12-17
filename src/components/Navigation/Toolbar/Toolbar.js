import React from 'react';

import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems';

const toolbar = props => {
    console.log('isopen',props.isOpen);
    let toolbarClasses = [classes.Toolbar, classes.Open];
    if (!props.isOpen) {
        toolbarClasses = [classes.Toolbar, classes.Close];
    }
    return (

        // <div className={classes.Toolbar}>
        <div className={toolbarClasses.join(' ')}>
            <NavigationItems toggle={props.toggle} />
        </div>
    )
}

export default toolbar;