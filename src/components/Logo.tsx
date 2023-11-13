import React from 'react';
import logo from '../assets/images/Logo.png'
import './Logo.css'
import {Link, useNavigate} from "react-router-dom";


const Logo = () => {

    const navigate = useNavigate()

    return (
        <div className={'logo-container'}>
            <Link to={'/workspaces'}>
                <img src={logo} alt="Логотип" className={'logo'}/>
            </Link>
            <div className="logo-title" onClick={() => navigate('/workspaces')}>
                REC & REM
            </div>
        </div>
    );
};

export default Logo;