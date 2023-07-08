import React, {FC} from 'react';
import AuthInput from "../UI/inputs/AuthInput";
import './AuthForm.css'


interface AuthProfileFormProps {
    firstName: string
    secondName: string
    profileName: string
    setFirstName(value: string): void
    setSecondName(value: string): void
    setProfileName(value: string): void
}

const AuthProfileForm: FC<AuthProfileFormProps> = (
    {profileName, firstName, setFirstName, setProfileName, secondName, setSecondName}
) => {
    return (
        <div>
            <div className={'form'}>
                <AuthInput
                    className={'input-username'}
                    value={firstName}
                    setValue={setFirstName}
                    placeholder={'Имя'}
                />
                <AuthInput
                    className={'input-username'}
                    value={secondName}
                    setValue={setSecondName}
                    placeholder={'Фамилия'}
                />
                <AuthInput
                    className={'input-username'}
                    value={profileName}
                    setValue={setProfileName}
                    placeholder={'Никнейм'}/>
            </div>
        </div>
    );
};

export default AuthProfileForm;