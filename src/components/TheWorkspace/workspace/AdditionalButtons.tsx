import React, {FC} from 'react';
import './AdditionalButtons.css'
import recently from '../../../assets/images/workspace/recently.png'
import deleteIcon from '../../../assets/images/workspace/delete.png'


interface AdditionalButtonsProps {

}


const AdditionalButtons: FC<AdditionalButtonsProps> = () => {
    return (
        <div>
            <div className="additional__button">
                <img src={recently} alt="Недавнее" className="additional__button__image"/>
                <div className="additional__button__text">
                    Недавнее
                </div>
            </div>
            <div className="additional__button">
                <img src={deleteIcon} alt="Корзина" className="additional__button__image"/>
                <div className="additional__button__text">
                    Корзина
                </div>
            </div>
        </div>
    );
};

export default AdditionalButtons;