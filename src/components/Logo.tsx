import React from 'react';
import logo from '../assets/images/Logo.png'
import './Logo.css'
import {Link} from "react-router-dom";


const Logo = () => {
    return (
        <div className={'logo-container'}>
            <Link to={'/'}>
                <img src={logo} alt="Логотип" className={'logo'}/>
            </Link>
        </div>
    );
};

export default Logo;