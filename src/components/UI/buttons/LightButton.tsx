import React, {FC, useState} from 'react';
import './LightButton.css'
import {useAdditionCSSClass} from "../../../hooks/useAdditionCSSClass";


interface LightButtonProps {
    children: React.ReactNode,
    onClick(): void,
    isDisabled?: boolean
    className?: string
}


const LightButton: FC<LightButtonProps> = ({children, onClick, isDisabled, className}) => {

    if (isDisabled === undefined) {
        isDisabled = false
    }

    let classes = useAdditionCSSClass('light-button', 'light-button__disabled', isDisabled)

    classes = useAdditionCSSClass(classes, className)

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