import React, { Component } from 'react';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from './store/actions/index';
import Auth from './containers/Auth/Auth';
import RegisterDocument from './containers/DocumentReg/DocumentReg';
import Layout from './components/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import DocumentType from './containers/Setup/DocumentType/DocumentType';
import FiscalYear from './containers/Setup/Fiscalyear/FiscalYear';

import Footer from './components/UI/Footer/Footer';

class App extends Component {

  componentDidMount() {
    this.props.checkAuthTimeout();
  }

  render() {
    let routes = (
      <Switch>
        <Route exact path="/" component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route path="/register-document" component={RegisterDocument} />
          <Route path="/document-type" component={DocumentType} />
          <Route path="/fiscal-year" component={FiscalYear} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/dashboard" />
        </Switch>
      )
    }

    let layout = null;
    if (this.props.isAuthenticated) {
      layout = (
        <Layout isAuthenticated={this.props.isAuthenticated} className="App">
          {routes}
          <Footer />
        </Layout>
      )
    } else {
      layout = (
        <div className="App">
          {routes}
          <Footer />
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
