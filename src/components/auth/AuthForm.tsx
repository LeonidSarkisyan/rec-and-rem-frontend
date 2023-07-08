import React, {FC, useEffect, useState} from 'react';
import AuthInput from "../UI/inputs/AuthInput";
import './AuthForm.css'
import {AuthTitle} from "../../pages/AuthPage";
import EyePassword from "../UI/eye-password/EyePassword";


interface AuthFormProps {
    typeAuth: AuthTitle
    username: string
    password: string
    setUsername(username: string): void
    setPassword(password: string): void
}

const AuthForm: FC<AuthFormProps> = (
    {typeAuth, password, username, setPassword, setUsername}
) => {

    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

    useEffect(() => {
        setUsername('')
        setPassword('')
    }, [typeAuth, setUsername, setPassword])

    return (
        <div className={'form'}>
            <AuthInput
                className={'input-username'}
                placeholder={'Login'}
                value={username}
                setValue={setUsername}
            />


        </div>
    );
};

export default AuthForm;