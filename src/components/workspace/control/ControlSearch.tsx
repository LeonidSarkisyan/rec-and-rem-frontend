import React, {ChangeEvent, FC, useState} from 'react';
import './ControlSearch.css'

const ControlSearch: FC = () => {

    const clearSearch = require('../../../assets/images/workspace/clear.png')

    const [query, setQuery] = useState<string>("")

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setQuery(event.target.value)
        console.log(event.target.value)
    }

    function clearSearchQuery() {
        setQuery("")
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