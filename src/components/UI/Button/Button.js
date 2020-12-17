import React from 'react';

import classes from './Button.module.css';

const button = props => (
    <button className={classes.Button} onClick={props.click} disabled={props.disabled}>{props.children}</button>
);

export default button;