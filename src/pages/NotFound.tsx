import React from 'react';
import './NotFound.css'
import {Link} from "react-router-dom";
import LinkUnderline from "../components/UI/links/LinkUnderline";


const NotFound = () => {
    return (
        <div className="not__found">
            <div className="not__found__title">
                К сожалению, ничего не найдено
            </div>
            <LinkUnderline
                url={'/workspaces'}
                text={'К рабочим пространствам'}
            />
        </div>
    );
};

export default NotFound;