import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import './BaseInput.css'


interface BaseInputProps {
    value: string
    setValue(value: string): void
    placeholder: string
    type? : string
    className? : string
    maxCount: number
    startFocus?: boolean
}


const BaseInput: FC<BaseInputProps> = (
    {value, setValue, placeholder, type, className, maxCount, startFocus}
) => {

    const [count, setCount] = useState<number>(0)

    const inputRef = useRef<HTMLInputElement>(null)

    const classes = className ? [className, 'input__base'] : ['input__base']

    useEffect(() => {
        if (inputRef.current && startFocus) {
            inputRef.current.focus()
        }
    }, [])

    useEffect(() => {
        setCount(value.length)
    }, [value])

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        const length = event.target.value.length
        if (length <= maxCount) {
            setValue(event.target.value)
            setCount(event.target.value.length)
        }
    }

    function focusOnInput() {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    return (
        <div className="input__base__div">
            <div className="input__base__title" onClick={() => focusOnInput()}>{placeholder}:</div>
            <div className="input__base__container">
                <input
                    ref={inputRef}
                    value={value}
                    className={classes.join(' ')}
                    type={type ? type : 'text'}
                    onChange={(event) => onChangeHandler(event)}
                />
                <div className="input__base__counter">
                    {count}/{maxCount}
                </div>
            </div>
        </div>
    );
};

export default BaseInput;