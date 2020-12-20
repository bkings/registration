import React from 'react';

import classes from './Spinner.module.css';

const spinner = () => {
    let innerOne = [classes.inner, classes.one];
    let innerTwo = [classes.inner, classes.two];
    let innerThree = [classes.inner, classes.three];
    return (
        /* <div className={classes.Loader}>
            <div class={classes.face}>
                <div class={classes.circle}></div>
            </div>
            <div class={classes.face}>
                <div class={classes.circle}></div>
            </div>
        </div> */
        <div className={classes.Loader}>
            <div className={innerOne.join(' ')}></div>
            <div className={innerTwo.join(' ')}></div>
            <div className={innerThree.join(' ')}></div>
        </div>
    )
};

export default spinner;