import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './DocumentReg.module.css';
import ViewDocReg from '../../components/View/DocumentRegV/DocumentRegV';

class DocumentReg extends Component {

    state = {
        regForm: {
            fiscalYear: {
                elementType: 'select',
                elementConfig: {
                    options: []
                },
                value: '',
                label: 'Fiscal Year :'
            },
            firstName: this.helper('input', 'text', 'First Name', '', true, 'First Name :'),
            middleName: this.helper('input', 'text', 'Middle Name', '', false, 'Middle Name :'),
            lastName: this.helper('input', 'text', 'Last Name', '', true, 'Last Name :'),
            dateOfBirth: this.helper('input', 'text', '2050-05-05', '', true, 'Date of Birth :'),
            enterDate: this.helper('input', 'text', '2077-05-05', '', true, 'Enter Date :'),
            documentType: {
                elementType: 'select',
                elementConfig: {
                    options: []
                },
                value: '',
                label: 'Document Type :'
            },
            phone: this.helper('input', 'text', 'Phone', '', false, 'Phone :'),
        }
    }

    componentDidMount() {
        this.props.fetchData(this.props.token);
        this.props.fetchFyData(this.props.token);
        this.props.fetchRegData(this.props.token);
        console.log('in mount');
    }

    componentDidUpdate(prevProps) {
        const optionsArrFy = this.props.fiscalYear.map(data => (
            {
                value: data.yearCode,
                displayValue: data.yearCode
            }
        ));

        const optionsArr = this.props.documentTypes.map(data => (
            {
                value: data._id,
                displayValue: data.docName
            }
        ));

        console.log('op', optionsArr);
        console.log('opfy', optionsArrFy);

        let initialValue = '', initialFyValue = '';
        if (optionsArr.length > 0) initialValue = optionsArr[0].value;
        if (optionsArrFy.length > 0) initialFyValue = optionsArrFy[0].value;
        const updated = {
            ...this.state.regForm,
            documentType: {
                ...this.state.regForm.documentType,
                elementConfig: {
                    ...this.state.regForm.documentType.elementConfig,
                    options: optionsArr
                },
                value: initialValue
            },
            fiscalYear: {
                ...this.state.regForm.fiscalYear,
                elementConfig: {
                    ...this.state.regForm.documentType.elementConfig,
                    options: optionsArrFy
                },
                value: initialFyValue
            }
        }

        if (this.props.documentTypes !== prevProps.documentTypes || this.props.fiscalYear !== prevProps.fiscalYear) {
            console.log('in here');
            this.setState({ regForm: updated });
        }
    }

    helper(element, type, placeholder, value, required, label) {
        return {
            elementType: element,
            elementConfig: {
                type,
                placeholder
            },
            value,
            validation: {
                required
            },
            label
        }
    }

    onChangeHandler = (event, inputIdentifier) => {
        const updatedForm = {
            ...this.state.regForm,
            [inputIdentifier]: {
                ...this.state.regForm[inputIdentifier],
                value: event.target.value
            }
        }
        this.setState({ regForm: updatedForm });
    }

    onSubmitHandler = event => {
        event.preventDefault();
        const formData = {};
        for (let input in this.state.regForm) {
            formData[input] = this.state.regForm[input].value
        }
        this.props.register(this.props.token, formData);
        this.setState({
            regForm: {
                ...this.state.regForm,
                firstName: {
                    ...this.state.regForm.firstName,
                    value: ''
                },
                middleName: {
                    ...this.state.regForm.middleName,
                    value: ''
                },
                lastName: {
                    ...this.state.regForm.lastName,
                    value: ''
                },
                dateOfBirth: {
                    ...this.state.regForm.dateOfBirth,
                    value: ''
                },
                enterDate: {
                    ...this.state.regForm.enterDate,
                    value: ''
                },
                phone: {
                    ...this.state.regForm.phone,
                    value: ''
                }
            }
        })
    }

    render() {
        let error = <p style={{ color: "red", textAlign: "center" }}>{this.props.error ? this.props.error : null} </p>;

        const formElementArray = [];
        for (let key in this.state.regForm) {
            formElementArray.push({
                id: key,
                formObject: this.state.regForm[key]
            })
        }

        const form = formElementArray.map(formElement => {
            return (
                <Input
                    key={formElement.id}
                    inputElementType={formElement.formObject.elementType}
                    elementConfig={formElement.formObject.elementConfig}
                    value={formElement.formObject.value}
                    label={formElement.formObject.label}
                    onChange={(event) => this.onChangeHandler(event, formElement.id)}
                />
            )
        });

        return (
            <div className={classes.DocumentReg}>
                <h2 style={{ textAlign: 'center', margin: "0" }}>Document Registration</h2>
                {error}
                <form id="reg-form" className={classes.Upper} onSubmit={this.onSubmitHandler}>
                    {form}
                    <Button>Save</Button>
                </form>
                <div>
                    <h3>Data</h3>
                    <ViewDocReg
                        viewType='RegisterDocument'
                        formKeys={this.state.regForm}
                        formData={this.props.registeredDocuments} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.authReducer.token,
        documentTypes: state.docTypesReducer.documentTypes,
        fiscalYear: state.fiscalYearReducer.fiscalYear,
        registeredDocuments: state.docTypesReducer.registeredDocuments,
        error: state.docTypesReducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: token => dispatch(actionCreators.fetchData(token)),
        fetchFyData: token => dispatch(actionCreators.fetchFy(token)),
        fetchRegData: token => dispatch(actionCreators.fetchRegData(token)),
        register: (token, data) => dispatch(actionCreators.registerPost(token, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentReg);