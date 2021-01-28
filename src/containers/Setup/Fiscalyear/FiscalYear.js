import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';

import classes from './FiscalYear.module.css';
import Button from '../../../components/UI/Button/Button';
import ViewDocReg from '../../../components/View/DocumentRegV/DocumentRegV';
import * as actionCreators from '../../../store/actions/index';

class FiscalYear extends Component {

    state = {
        fyForm: {
            yearCode: this.helper('input', 'text', '7778', '', true, 'Year Code :'),
            year: this.helper('input', 'text', '2077-2078', '', true, 'Year :'),
            startDate: this.helper('input', 'text', '2077-03-03', '', true, 'Start Date :'),
            endDate: this.helper('input', 'text', '2078-04-01', '', true, 'End Date :'),
            status: this.helper('input', 'text', 'Y/N', '', true, 'Status :')
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

    render() {
        let formArray = [];
        for (let key in this.state.fyForm) {
            formArray.push({
                id: key,
                formElement: this.state.fyForm[key]
            })
        }
        let form = formArray.map(formEl => (
            <Input
                key={formEl.id}
                inputElementType={formEl.formElement.elementType}
                elementConfig={formEl.formElement.elementConfig}
                label={formEl.formElement.label}
            />
        ));
        return (
            <div className={classes.FiscalYear}>
                <form className={classes.Upper}>
                    {form}
                    <Button>Save</Button>
                </form>
                <br />
                <div>
                    <ViewDocReg
                        formKeys={this.state.fyForm}
                        formData={this.props.fiscalYearData} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.fiscalYearReducer.loading,
        fiscalYearData: state.fiscalYearReducer.fiscalYear
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSaveFy: (token, data) => dispatch(actionCreators.postFY(token, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FiscalYear);