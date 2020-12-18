import React, { Component } from 'react';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

class DocumentType extends Component {

    state = {
        documentTypeForm: {
            docType: this.helper('input', 'text', 'Type', '', true, 'Document Type :'),
            docName: this.helper('input', 'text', 'Name', '', false, 'Document Name :')
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
            ...this.state.documentTypeForm,
            [inputIdentifier]: {
                ...this.state.documentTypeForm[inputIdentifier],
                value: event.target.value
            }
        }
        this.setState({ documentTypeForm: updatedForm });
    }

    onSubmitHandler = event => {
        event.preventDefault();
        const formData = {};
        for (let input in this.state.documentTypeForm) {
            formData[input] = this.state.documentTypeForm[input].value
        }

        this.setState({
            documentTypeForm: {
                ...this.state.documentTypeForm,
                docType: {
                    ...this.state.documentTypeForm.docType,
                    value: ''
                },
                docName: {
                    ...this.state.documentTypeForm.docName,
                    value: ''
                }
            }
        })
    }

    render() {
        let error = <p style={{ color: "red", textAlign: "center" }}>{this.props.error ? this.props.error : null} </p>;

        const formElementArray = [];
        for (let key in this.state.documentTypeForm) {
            formElementArray.push({
                id: key,
                formObject: this.state.documentTypeForm[key]
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
            <div>
                {error}
                <form>
                    {form}
                    <Button>Save</Button>
                </form>
            </div>
        )
    }
}

export default DocumentType;