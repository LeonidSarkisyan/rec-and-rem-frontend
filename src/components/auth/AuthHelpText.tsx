import React, {FC} from 'react';
import './AuthHelpText.css'
import {AuthTitle} from "../../pages/AuthPage";
import LinkUnderline from "../UI/links/LinkUnderline";


interface AuthHelpTextProps {
    value: AuthTitle
    setValue(value: AuthTitle): void
}

const AuthHelpText: FC<AuthHelpTextProps> = ({value, setValue}) => {
    if (value === AuthTitle.sign) {
        return (
            <div className={'container'}>
                <span> Уже есть аккаунт? </span>
                <LinkUnderline text={'Войти'} onClick={() => setValue(AuthTitle.login)}/>
            </div>
        )
    }

    return (
        <div className={'container'}>
            <span> Впервые здесь? </span>
            <LinkUnderline text={'Создать аккаунт'} onClick={() => setValue(AuthTitle.sign)}/>
        </div>
    )
};

export default AuthHelpText;