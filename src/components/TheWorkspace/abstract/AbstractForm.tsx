import React, {FC} from 'react';
import './AbstractForm.css'
import MyLoader from "../../UI/loaders/MyLoader";


interface AbstractFormProps {
    createAbstract(): void
    uploadAbstract(): void
}


const AbstractForm: FC<AbstractFormProps> = ({createAbstract, uploadAbstract}) => {

    return (
        <div className="abstract__form">
            <div className="abstract__form__titles">
                <span className="abstract__form__title" onClick={() => createAbstract()}>
                    + Новый конспект
                </span>
                <span className="abstract__form__title" onClick={() => uploadAbstract()}>
                    Загрузить конспект
                </span>
            </div>
        </div>
    );
};

export default AbstractForm;