import React, {ChangeEvent, FC, useState} from 'react';
import './ControlSearch.css'
import useDebounds from "../../../hooks/useDebounds";


interface ControlSearchProps {
    fetch(querySearch: string): void
}


const ControlSearch: FC<ControlSearchProps> = ({fetch}) => {

    const clearSearch = require('../../../assets/images/workspace/clear.png')

    const [query, setQuery] = useState<string>("")

    const debouncedSearch = useDebounds(search, 500)

    async function search(value: string) {
        await fetch(value)
    }

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setQuery(event.target.value)
        debouncedSearch(event.target.value)
    }

    function clearSearchQuery() {
        setQuery("")
        debouncedSearch("")
    }

    return (
        <div className="workspace__search">
            <input
                type="text"
                className="workspace__input"
                placeholder="Поиск..."
                value={query}
                onChange={(event) => onChangeHandler(event)}
            />
            <div onClick={() => clearSearchQuery()}>
                <img src={clearSearch} className="clear__search" alt="Иконка очистить поиск"/>
            </div>
        </div>
    );
};

export default ControlSearch;