import React, {ChangeEvent, useState, KeyboardEvent, FC} from 'react';
import './FolderForm.css'
import MyLoader from "../../UI/loaders/MyLoader";
import {useValidFormData} from "../../../hooks/useValidFormData";
import FolderFormMenu from "./FolderFormMenu";


interface FolderFormProps {
    isLoading: boolean,
    createFolder(title: string): void
}


const FolderForm: FC<FolderFormProps> = ({createFolder, isLoading}) => {
    const [title, setTitle] = useState<string>('')

    const isValid = useValidFormData([title])

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            preCreateFolder()
        }
    }

    function preCreateFolder() {
        if (isValid) {
            createFolder(title)
            setTitle('')
        }
    }

    return (
        <div className="folder__form__container">
            <div className="folder__form">
                <input
                    onKeyDown={(event) => onKeyDownHandler(event)}
                    className="folder__form__input"
                    type="text"
                    placeholder="Название каталога..."
                    value={title}
                    onChange={event => onChangeHandler(event)}
                />
                {isLoading
                    ?
                    <MyLoader className={'folder__form__loader'}/>
                    :
                    <div className="folder__form__add" onClick={() => preCreateFolder()}>
                        +
                    </div>
                }
            </div>
        </div>
    );
};

export default FolderForm;