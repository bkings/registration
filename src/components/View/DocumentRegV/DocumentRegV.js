import React from 'react';
import classes from './DocumentRegV.module.css';

const documentRegV = props => {
    let columnHeaders = Object.keys(props.formKeys).map(col => <th key={col}>{col.toUpperCase()}</th>);
    let columnData = props.formData.map(data => {
        return (
            <tr key={data.regNo}>
                <td>{data.regNo}</td>
                <td>{data.fiscalYear}</td>
                <td>{data.firstName}</td>
                <td>{data.middleName}</td>
                <td>{data.lastName}</td>
                <td>{data.dateOfBirth}</td>
                <td>{data.enterDate}</td>
                <td>{data.documentType.docName}</td>
                <td>{data.phone}</td>
            </tr>
        )
    })
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
                    {columnData}
                </tbody>
            </table>
        </div>
    );
}

export default documentRegV;