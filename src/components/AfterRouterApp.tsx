import React, {useEffect} from 'react';
import {Route, useNavigate, Routes} from "react-router-dom";
import useCurrentUser from "../hooks/auth/getUser";
import {routes} from "../router";

const AfterRouterApp = () => {

    const navigate = useNavigate()

    const {getUser} = useCurrentUser(() => {

    }, () => {
        navigate('/auth')
    })

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div>
            <Routes>
                {routes.map(route =>
                    <Route key={route.path} path={route.path} element={<route.component/>}/>
                )}
            </Routes>
        </div>
    );
};

export default AfterRouterApp;