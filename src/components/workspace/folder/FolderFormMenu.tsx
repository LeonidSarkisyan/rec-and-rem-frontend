import React, {ChangeEvent, FC, useState} from 'react';
import './FolderFormMenu.css'
import useDebounds from "../../../hooks/useDebounds";


interface FolderFormMenuProps {
    fetch(querySearch: string): void
    showUploadModal(): void
}


const FolderFormMenu: FC<FolderFormMenuProps> = ({fetch, showUploadModal}) => {

    const [searchQuery, setSearchQuery] = useState<string>('')

    const debouncedSearch = useDebounds(search, 500)

    async function search(search: string) {
        await fetch(search)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
        debouncedSearch(event.target.value)
    }

    return (
        <div className="folder__form__menu">
            <div className="folder__form__search">
                <input
                    type="text"
                    className="folder__form__input"
                    placeholder="Поиск..."
                    value={searchQuery}
                    onChange={event => onChangeHandler(event)}
                />
            </div>
            <div
                onClick={() => showUploadModal()}
                className="folder__form__menu__point folder__form__upload"
            >
                Загрузить
            </div>
        </div>
    );
};

export default FolderFormMenu;