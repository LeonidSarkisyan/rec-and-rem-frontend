import React, {FC, useEffect, useState} from 'react';
import './BaseError.css'
import MyDropDawn from "../drop-dawns/MyDropDawn";


interface BaseErrorProps {
    error: string
    setError(error: string): void,
    className?: string
}


const BaseError: FC<BaseErrorProps> = ({error, setError, className}) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        setIsOpen(Boolean(error))
    }, [error])

    return (
        <MyDropDawn isOpen={isOpen} className={className}>
            <div className="error">
                <div>{error}</div>
                <div className={'close-button'} onClick={() => setError('')}>&#x2716;</div>
            </div>
        </MyDropDawn>
    );
};

export default BaseError;