import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {routes} from "../router";
import Logo from "./Logo";


const RouterApp = () => {
    return (
        <BrowserRouter>
            <Logo/>
            <Routes>
                {routes.map(route =>
                    <Route key={route.path} path={route.path} element={<route.component/>}/>
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default RouterApp;