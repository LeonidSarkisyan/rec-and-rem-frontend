import React, {FC, useEffect, useState} from 'react';
import AuthInput from "../UI/inputs/AuthInput";
import './AuthForm.css'
import {AuthTitle} from "../../pages/AuthPage";
import EyePassword from "../UI/eye-password/EyePassword";
import AuthPassword from "./AuthPassword";


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
            <AuthPassword password={password} setPassword={setPassword}/>
        </div>
    );
};

export default AuthForm;