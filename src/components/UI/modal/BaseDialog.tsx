import React, {FC} from 'react';
import {BaseModalProps} from "./BaseModal";
import './BaseDialog.css'
import MyLoader from "../loaders/MyLoader";
import LightButton from "../buttons/LightButton";


interface BaseDialogProps extends BaseModalProps {
    callback(): void,
    question: string,
    textButton: string,
    isLoading?: boolean
}


const BaseDialog: FC<BaseDialogProps> = ({
    title, setShow, show, callback, question, textButton, isLoading
}) => {

    const callbackHandler = () => {
        callback()
    }

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
                            {question}
                        </div>
                        <div className="workspace__form__button">

                        </div>
                            <div className="base__dialog__buttons">
                                <div className="base__dialog__button base__dialog__button__cancel" onClick={() => {setShow(false)}}>
                                    Отмена
                                </div>
                                {isLoading
                                    ? <MyLoader/>
                                    : <div className="base__dialog__button" onClick={() => callbackHandler()}>
                                          {textButton}
                                      </div>
                                }
                            </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default BaseDialog;