import React, {useState, useEffect} from 'react';
import modules from './AuthPage.module.css'
import AuthForm from "../components/auth/AuthForm";
import AuthButtons from "../components/auth/AuthButtons";
import AuthHelpText from "../components/auth/AuthHelpText";
import auth_service from "../api/AuthService";
import {useValidFormData} from "../hooks/useValidFormData";
import {useFetching} from "../hooks/useFetching";
import AuthError from "../components/auth/AuthError";
import AuthProfileForm from "../components/auth/AuthProfileForm";
import {useNavigate} from "react-router-dom";
import MyDropDawn from "../components/UI/drop-dawns/MyDropDawn";
import useCurrentUser from "../hooks/auth/getUser";
import GetUser from "../hooks/auth/getUser";


export enum AuthTitle {
    sign = 'Регистрация',
    login = 'Войти',
}

const AuthPage = () => {
    const [authTitle, setAuthTitle] = useState<AuthTitle>(AuthTitle.login)

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')
    const [secondName, setSecondName] = useState<string>('')
    const [profileName, setProfileName] = useState<string>('')

    const [isOpenProfileForm, setIsOpenProfileForm] = useState<boolean>(false)

    const isValidForm = useValidFormData([username, password])

    const isValidProfileForm = useValidFormData([firstName, secondName, profileName])

    const navigate = useNavigate()

    const {getUser} = useCurrentUser(() => {
        navigate('/workspaces')
    }, () => {

    })

    useEffect(() => {
        getUser()
    }, [])


    const {fetching: loginAuth, isLoading, error, setError} = useFetching(async () => {
        const response = await auth_service.login(username, password)
        if (response.status === 204) {
            goToWorkspacePage()
        }
    })

    const {fetching: regAuth, isLoading: regIsLoading, error: regError, setError: setAuthError} = useFetching(async () => {
        const response = await auth_service.register(username, password, firstName, secondName, profileName)
        console.log(response.status)
        if (response.status === 200) {
            goToWorkspacePage()
        }
    })

    function goToWorkspacePage() {
        navigate('/workspaces')
    }

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

    async function register() {
        if (isValidProfileForm && isValidForm) {
            await regAuth()
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
            <AuthError error={regError} setError={setAuthError}/>
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
                isLoading={isLoading || regIsLoading}
                openProfileForm={openProfileForm}
                login={login}
                authType={authTitle}
                isOpenProfileForm={isOpenProfileForm}
            />
        </div>
    );
};

export default AuthPage;