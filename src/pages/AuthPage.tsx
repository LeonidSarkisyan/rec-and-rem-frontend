import React, {useState} from 'react';
import modules from './AuthPage.module.css'
import AuthForm from "../components/auth/AuthForm";
import AuthButtons from "../components/auth/AuthButtons";
import AuthHelpText from "../components/auth/AuthHelpText";
import auth_service from "../api/AuthService";
import {useValidFormData} from "../hooks/useValidFormData";
import {useFetching} from "../hooks/useFetching";
import AuthError from "../components/auth/AuthError";
import AuthProfileForm from "../components/auth/AuthProfileForm";
import useInput from "../hooks/useInput";
import MyDropDawn from "../components/UI/drop-dawns/MyDropDawn";


export enum AuthTitle {
    sign = 'Регистрация',
    login = 'Войти',
}

const AuthPage = () => {
    const [authTitle, setAuthTitle] = useState<AuthTitle>(AuthTitle.sign)

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')
    const [secondName, setSecondName] = useState<string>('')
    const [profileName, setProfileName] = useState<string>('')

    const [isOpenProfileForm, setIsOpenProfileForm] = useState<boolean>(false)

    const isValidForm = useValidFormData([username, password])

    const isValidProfileForm = useValidFormData([firstName, secondName, profileName])

    const {fetching: loginAuth, isLoading, error, setError} = useFetching(async () => {
        const response = await auth_service.login(username, password)
        if (response.status === 204) {
            console.log('ПОРА НА СТРАНИЦУ РАБОЧИХ ПРОСТРАНСтв')
        }
    })

    function changeAuthTitleHandler(value: AuthTitle) {
        setAuthTitle(value)
        setError('')
        setIsOpenProfileForm(false)
        setFirstName('')
        setSecondName('')
        setProfileName('')
    }

    async function login() {
        if (isValidForm) {
            await loginAuth()
        }
    }

    function register() {
        if (isValidProfileForm && isValidForm) {
            console.log('урааа')
        }
    }

    async function openProfileForm() {
        setIsOpenProfileForm(true)
    }

    return (
        <div className={modules.container}>
            <h1 className={modules.title}>{authTitle}</h1>
            <AuthForm
                typeAuth={authTitle}
                password={password}
                username={username}
                setPassword={setPassword}
                setUsername={setUsername}
            />
            <AuthHelpText value={authTitle} setValue={(value) => changeAuthTitleHandler(value)}/>
            <AuthError error={error} setError={setError}/>
            <MyDropDawn isOpen={isOpenProfileForm}>
                <AuthProfileForm
                    setFirstName={setFirstName}
                    setSecondName={setSecondName}
                    setProfileName={setProfileName}
                    profileName={profileName}
                    secondName={secondName}
                    firstName={firstName}
                />
            </MyDropDawn>
            <AuthButtons
                register={register}
                isLoading={isLoading}
                openProfileForm={openProfileForm}
                login={login}
                authType={authTitle}
                isOpenProfileForm={isOpenProfileForm}
            />
        </div>
    );
};

export default AuthPage;