import React, { Component } from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import Toggle from '../Navigation/DrawerToggle/DrawerToggle';

class Layout extends Component {
    state = {
        toggle: true
    }

    toggleHandler = () => {
        this.setState(prevState => {
            return { toggle: !prevState.toggle };
        })
    }

    render() {
        let assignedClass = classes.ContentOpen;
        if (!this.state.toggle) {
            assignedClass = classes.ContentClose;
        }
        let toolbar = null;
        if (this.props.isAuthenticated) {
            toolbar = <Toolbar toggle={this.toggleHandler} isOpen={this.state.toggle} />;
        }
        return (
            <div>
                <div className={classes.TopToggle}>
                    <Toggle toggle={this.toggleHandler} isOpen={this.state.toggle} />
                    <span><strong>Registration</strong></span>
                </div>
                {toolbar}
                <main className={assignedClass}>{this.props.children} </main>
            </div>
        )
    }
}

export default Layout;