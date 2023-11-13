import React, {FC} from 'react';
import './BaseModal.css'
import {Dispatch, SetStateAction} from "react";


export interface BaseModalProps {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    children: React.ReactNode,
    title?: string,
}


const BaseModal: FC<BaseModalProps> = ({show, setShow, children, title}) => {
    return (
        <div>
            {show &&
                <div className="modal__back" onMouseDown={event => setShow(false)}>
                    <div className="modal__inner" onMouseDown={event => event.stopPropagation()}>
                        {title &&
                            <div className="modal__title">
                                {title}
                            </div>
                        }
                        <div className="modal__content">
                            {children}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default BaseModal;