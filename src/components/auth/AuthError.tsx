import React, {FC} from 'react';
import './AuthError.css'
import {useAdditionCSSClass} from "../../hooks/useAdditionCSSClass";


interface AuthErrorProps {
    error: string,
    setError(error: string): void,
    className?: string
}


const AuthError: FC<AuthErrorProps> = ({error, setError, className}) => {
    const classes = error ? ['error-container-hover', 'error-container'] : ['error-container']

    const classesWithAddition = useAdditionCSSClass('error', className)

    return (
        <div className={classes.join(' ')}>
            <div className={classesWithAddition}>
                <div>{error}</div>
                <div className={'close-button'} onClick={() => setError('')}>&#x2716;</div>
            </div>
        </div>
    );
};

export default AuthError;