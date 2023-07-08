import React, {FC} from 'react';
import AuthInput from "../UI/inputs/AuthInput";
import EyePassword from "../UI/eye-password/EyePassword";


interface AuthPasswordProps {
    password: string
    setPassword(password: string): void

    isShowPassword: boolean
    setIsShowPassword(value: boolean): void
}

const AuthPassword: FC<AuthPasswordProps> = ({password, setPassword, isShowPassword, setIsShowPassword}) => {
    return (
        <div className={'password'}>
            <AuthInput
                type={'password'}
                placeholder={'Password'}
                value={password}
                setValue={setPassword}
            />
            <EyePassword isShow={isShowPassword} setIsShow={setIsShowPassword}/>
        </div>
    );
};

export default AuthPassword;