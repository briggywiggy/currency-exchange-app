import React from 'react';

const FormInput = ({ handleChange, label, isForexInput, ...otherProps }) => {
    return (
        <div className="group">
            <input className={`${isForexInput ? 'form-input--forex' : ''} form-input`}
            onChange={handleChange}
            {...otherProps}
            />
            { label ? <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label> : null }
        </div>
    )
}

export { FormInput as default };