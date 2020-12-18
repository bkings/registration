import React from 'react';
import classes from './DocumentRegV.module.css';

const documentRegV = props => {
    let regNo;
    let formKeysArray = Object.keys(props.formKeys);
    if (props.viewType === 'RegisterDocument') {
        formKeysArray.unshift('regNo');
    }
    let columnHeaders = Object.keys(props.formKeys).map(col => <th key={col}>{col.toUpperCase()}</th>);
    let colData = props.formData.map(data => {
        const tdata = (
            formKeysArray.map(col => {
                let tdVal = data[col];
                if (props.viewType === 'RegisterDocument') {
                    regNo = data.regNo;
                    if (col === 'documentType') tdVal = data[col].docName;
                }
                return (
                    <td key={col}>
                        {
                            tdVal
                        }
                    </td>
                )
            })
        );

        return (
            <tr key={regNo}>
                {tdata}
            </tr>
        )
    });

    return (
        <div className={classes.DocumentRegV}>
            <table className={classes.Table}>
                <thead>
                    <tr>
                        <th>REGISTRATION NO.</th>
                        {columnHeaders}
                    </tr>
                </thead>
                <tbody>
                    {colData}
                </tbody>
            </table>
        </div>
    );
}

export default documentRegV;