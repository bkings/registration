import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from './store/actions/index';
import Auth from './containers/Auth/Auth';
import RegisterDocument from './containers/DocumentReg/DocumentReg';
import Layout from './components/Layout/Layout';

class App extends Component {

  componentDidMount() {
    this.props.checkAuthTimeout();
  }

  render() {
    let routes = (
      <div>
        <Route exact path="/" component={Auth} />
      </div>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <div>
          <Route exact path="/" component={Auth} />
          <Route path="/register-document" component={RegisterDocument} />
        </div>
      )
    }

    let layout = null;
    if (this.props.isAuthenticated) {
      layout = (
        <Layout isAuthenticated={this.props.isAuthenticated} className="App">
          {routes}
        </Layout>
      )
    } else {
      layout = (
        <div className="App">
          {routes}
        </div>
      )
    }

    return layout;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token != null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuthTimeout: () => dispatch(actionCreators.authCheckBeforeLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
