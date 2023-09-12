import React, {FC, useState} from 'react';
import './LightButton.css'
import {useAdditionCSSClass} from "../../../hooks/useAdditionCSSClass";


interface LightButtonProps {
    children: React.ReactNode,
    onClick(): void,
    isDisabled?: boolean
}


const LightButton: FC<LightButtonProps> = ({children, onClick, isDisabled}) => {

    if (isDisabled === undefined) {
        isDisabled = false
    }

    const classes = useAdditionCSSClass('light-button', 'light-button__disabled', isDisabled)

    const clickHandler = () => {
        if (!isDisabled) {
            onClick()
        }
    }

    return (
        <div className={classes} onClick={() => clickHandler()}>
            {children}
        </div>
    );
};

export default LightButton;