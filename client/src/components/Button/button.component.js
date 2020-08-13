import React from 'react';

const Button = ({ children, isFullWidth, ...otherProps }) => {
    return (
        <button className={`${isFullWidth ? 'button--full-width' : ''} button`}
        {...otherProps}>
            {children}
        </button>
    )
}

export { Button as default };