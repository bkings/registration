import React from 'react';
import classes from './Input.module.css';

const input = props => {

    let inputElement = null;

    switch (props.inputElementType) {
        case 'input':
            inputElement = (
                <div>
                    <label className={classes.Label}>{props.label}</label>&nbsp;
                    <input
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.onChange}
                    />
                </div>
            );
            break;
        case 'textArea':
            inputElement = (
                <textarea
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.onChange}
                />
            );
            break;
        case 'select':
            inputElement = (
                <div>
                    <label className={classes.Label}>{props.label}</label>
                    <select value={props.value}
                        onChange={props.onChange}>
                        {props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>{option.displayValue} </option>
                        ))}
                    </select>
                </div>
            );
            break;
        default:
            inputElement = (
                <div>
                    <label className={classes.Label}>{props.label}</label><br />
                    <input
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.onChange}
                    />
                </div>
            )
            break;
    }


    return (
        <div className={classes.Input}>
            {inputElement}
        </div>
    )
}

export default input;