import React, {ChangeEvent, FC} from 'react';
import './AuthInput.css'

interface AuthInputProps {
    value: string
    setValue(value: string): void
    placeholder: string
    type? : string
    className? : string
}

const AuthInput: FC<AuthInputProps> = ({value, setValue, placeholder, type, className}) => {

    const classes = className ? [className, 'input'] : ['input']

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value)
    }

    return (
        <input
            value={value}
            placeholder={placeholder}
            className={classes.join(' ')}
            type={type ? type : 'text'}
            onChange={(event) => onChangeHandler(event)}
        />
    );
};

export default AuthInput;