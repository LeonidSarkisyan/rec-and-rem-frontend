import React, {Dispatch, FC, SetStateAction, useEffect, useRef} from 'react';
import './BaseSwitch.css'


interface BaseSwitchProps {
    bool: boolean
    setBool(bool: boolean): void,
}


const BaseSwitch: FC<BaseSwitchProps> = ({bool, setBool}) => {

    const switchButtonRef = useRef<HTMLHeadingElement>(null)
    const switchBackRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        if (switchButtonRef.current && switchBackRef.current) {
            if (!bool) {
                switchButtonRef.current.style.marginLeft = '0px'
                switchButtonRef.current.classList.remove('switch__button__active')
                switchBackRef.current.classList.remove('switch__back__active')
            } else {
                switchButtonRef.current.style.marginLeft = '30px'
                switchButtonRef.current.classList.add('switch__button__active')
                switchBackRef.current.classList.add('switch__back__active')
            }
        }
    }, [bool])

    function switchValue() {
        setBool(!bool)
    }

    return (
        <div className="switch__back" onClick={() => switchValue()} ref={switchBackRef}>
            <div className="switch__button" ref={switchButtonRef}>

            </div>
        </div>
    );
};

export default BaseSwitch;