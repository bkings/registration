import React, { Component } from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';

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
                {toolbar}
                <main className={assignedClass}>{this.props.children} </main>
            </div>
        )
    }
}

export default Layout;