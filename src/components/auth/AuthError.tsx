import React, {FC} from 'react';
import './AuthError.css'


interface AuthErrorProps {
    error: string,
    setError(error: string): void
}


const AuthError: FC<AuthErrorProps> = ({error, setError}) => {
    const classes = error ? ['error-container-hover', 'error-container'] : ['error-container']

    return (
        <div className={classes.join(' ')}>
            <div className={'error'}>
                <div>{error}</div>
                <div className={'close-button'} onClick={() => setError('')}>&#x2716;</div>
            </div>
        </div>
    );
};

export default AuthError;