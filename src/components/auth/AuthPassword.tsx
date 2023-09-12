import React, {FC, useEffect, useState} from 'react';
import AuthInput from "../UI/inputs/AuthInput";
import EyePassword from "../UI/eye-password/EyePassword";


interface AuthPasswordProps {
    password: string
    setPassword(password: string): void
}

const AuthPassword: FC<AuthPasswordProps> = ({password, setPassword}) => {

    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
    const [typeInput, setTypeInput] = useState<string>('password')

    useEffect(() => {
        if (isShowPassword) {
            setTypeInput('text')
        } else {
            setTypeInput('password')
        }
    }, [isShowPassword])

    return (
        <div className={'password'}>
            <AuthInput
                type={typeInput}
                placeholder={'Password'}
                value={password}
                setValue={setPassword}
            />
            <EyePassword isShow={isShowPassword} setIsShow={setIsShowPassword}/>
        </div>
    );
};

export default AuthPassword;