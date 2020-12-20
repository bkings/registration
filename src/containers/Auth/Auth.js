import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import Pic from '../../assets/images/reg.jpg';
import * as actionCreators from '../../store/actions/index';

import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {

    state = {
        authForm: {
            email: this.helperMethod("input", "text", "Email or Username", "", true),
            password: this.helperMethod("input", "password", "Password", "", true)
        }
    }

    helperMethod(element, elementType, placeholder, value, required) {
        return {
            elementType: element,
            elementConfig: {
                type: elementType,
                placeholder
            },
            value,
            validation: {
                required
            }
        }
    }

    onInputChangedHandler = (event, inputIdentifier) => {
        const updatedForm = {
            ...this.state.authForm,
            [inputIdentifier]: {
                ...this.state.authForm[inputIdentifier],
                value: event.target.value
            }
        }
        this.setState({ authForm: updatedForm });
    }

    onSubmitHandler = event => {
        event.preventDefault();
        this.props.authenticate(this.state.authForm.email.value, this.state.authForm.password.value);
    }

    render() {

        let formElementArray = [];
        for (let key in this.state.authForm) {
            formElementArray.push({
                id: key,
                formElement: this.state.authForm[key]
            });
        }

        const form = formElementArray.map(formObject => {
            return (
                <Input
                    key={formObject.id}
                    inputElementType={formObject.formElement.elementType}
                    elementConfig={formObject.formElement.elementConfig}
                    value={formObject.formElement.value}
                    onChange={event => this.onInputChangedHandler(event, formObject.id)} />
            )
        })

        let redirect = this.props.isAuthenticated ? <Redirect to='/register-document' /> : null;
        let SplitLeft = [classes.Split, classes.Mini];
        let SplitRight = [classes.Split, classes.Form];
        let styleImage = {
            "backgroundImage": "url(" + Pic + ")",
            "backgroundPosition": "center",
            "backgroundSize": "cover",
            "filter": "contrast(140%)",
            "color": "white"
        }

        let button = (
            <Button>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                        Log In
            </Button>
        )
        if (this.props.loading) {
            button = <Spinner />;
        }

        return (
            <div>
                {redirect}
                <div style={styleImage} className={SplitLeft.join(' ')}>
                    <h2 style={{ fontFamily: "consolas", letterSpacing: "4px", fontSize: "2rem" }}>Welcome to Online Registration System !</h2>
                    <p style={{
                        fontFamily: "consolas",
                        letterSpacing: "3px",
                        position: "absolute",
                        top: "15%",
                        left: "17%",
                        padding: "50px",
                        fontSize: "22px",
                        width: "80%",
                        margin: "auto",
                        textAlign: "left"
                    }}>&gt; Register all your documents without any hassle.<br />&gt; Passports, License, Citizenship and many more.<br />&gt; No more paper works. No more middle man.</p>
                </div>
                <Backdrop />
                <div className={SplitRight.join(' ')}>
                    <div className={classes.ForSpan}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className={classes.Auth}>
                        <h3 style={{ paddingBottom: "10px", marginBottom: "25px", fontFamily: "consolas", letterSpacing: "5px" }}>Registration System | LOGIN</h3>
                        <form onSubmit={this.onSubmitHandler}>
                            {form}
                            {button}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading,
        isAuthenticated: state.authReducer.token != null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticate: (email, password) => dispatch(actionCreators.authenticate(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);