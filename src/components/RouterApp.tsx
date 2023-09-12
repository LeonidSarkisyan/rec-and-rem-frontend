import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {routes} from "../router";
import Logo from "./Logo";
import useCurrentUser from "../hooks/auth/getUser";
import AfterRouterApp from "./AfterRouterApp";


const RouterApp = () => {

    return (
        <BrowserRouter>
            <Logo/>
            <AfterRouterApp/>
        </BrowserRouter>
    );
};

export default RouterApp;