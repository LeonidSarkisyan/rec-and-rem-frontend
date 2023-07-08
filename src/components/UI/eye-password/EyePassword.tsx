import React, {FC} from 'react';

import eyeOpen from '../../../assets/images/auth/OpenEyePassword.png'
import eyeClose from '../../../assets/images/auth/CloseEyePassword.png'


interface EyePasswordProps {
    isShow: boolean
    setIsShow(value: boolean): void
}

const EyePassword: FC<EyePasswordProps> = ({isShow, setIsShow}) => {

    const image = isShow ? eyeOpen : eyeClose

    return (
        <div onClick={() => setIsShow(!isShow)}>
            <img src={image} alt="Картинка с глазом" className={'password-image'}/>
        </div>
    );
};

export default EyePassword;