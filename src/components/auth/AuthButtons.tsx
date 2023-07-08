import React, {FC} from 'react';
import {AuthTitle} from "../../pages/AuthPage";
import './AuthButtons.css'
import MyButton from "../UI/buttons/MyButton";
import MyLoader from "../UI/loaders/MyLoader";


interface AuthButtonsProps {
    authType: AuthTitle
    login(): void
    register(): void
    isLoading: boolean,
    isOpenProfileForm: boolean,
    openProfileForm(): void
}

const AuthButtons: FC<AuthButtonsProps> = (
    {authType, login, register, isLoading, isOpenProfileForm, openProfileForm}
) => {

    if (isLoading) {
        return (
            <div className={'container'}>
                <MyLoader/>
            </div>
        )
    }

    if (authType === AuthTitle.login) {
        return (
            <div className={'container'}>
                <MyButton onClick={() => login()}>
                    Войти
                </MyButton>
            </div>
        );
    }

    if (isOpenProfileForm) {
        return (
            <div className={'container'}>
                <MyButton onClick={() => register()}>
                    Зарегистрироваться
                </MyButton>
            </div>
        )
    }

    return (
        <div className={'container'}>
            <MyButton onClick={() => openProfileForm()}>
                Создать профиль
            </MyButton>
        </div>
    )
};

export default AuthButtons;