import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import plus from '../../../assets/images/workspace/plus.png'
import './FolderMenuForm.css'
import MyLoader from "../../UI/loaders/MyLoader";


interface FolderMenuFormProps {
    isLoading: boolean
    createFolder(title: string): void
}


const FolderMenuForm: FC<FolderMenuFormProps> = ({createFolder, isLoading}) => {

    const [placeholderText, setPlaceholderText] = useState<string>('Новый каталог...')

    function onKeyDownHandler(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            createFolder(placeholderText)
            setPlaceholderText('')
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPlaceholderText(event.target.value)
    }

    const onFocusHandler = () => {
        if (placeholderText === 'Новый каталог...') {
            setPlaceholderText('')
        }
    }

    const onFocusCaptureHandler = () => {
        if (placeholderText.length === 0) {
            setPlaceholderText('Новый каталог...')
        }
    }

    return (
        <div>
            <div className="folder__menu__form">
                <input
                    value={placeholderText}
                    onKeyDown={(event) => onKeyDownHandler(event)}
                    onChange={(event) => onChangeHandler(event)}
                    onFocus={() => onFocusHandler()}
                    onBlur={() => onFocusCaptureHandler()}
                    type="text"
                    className="folder__menu__form__input"
                />
                {isLoading ?
                    <MyLoader className={'folder__form__loader'}/>
                    :
                    <img src={plus} alt="Создать новый каталог" className="folder__menu__form__plus"/>
                }
            </div>
        </div>
    );
};

export default FolderMenuForm;