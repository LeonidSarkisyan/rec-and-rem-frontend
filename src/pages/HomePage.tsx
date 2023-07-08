import React, {useState} from 'react';
import {Link} from "react-router-dom";
import MyDropDawn from "../components/UI/drop-dawns/MyDropDawn";
import MyLoader from "../components/UI/loaders/MyLoader";
import MyButton from "../components/UI/buttons/MyButton";
import Logo from "../components/Logo";

const HomePage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div>
            <h1>Домашняя</h1>
            <Link to={'/auth'}>Регаться</Link>
            <MyButton onClick={() => setIsOpen(!isOpen)}>Открыть / Закрыть</MyButton>
        </div>
    );
};

export default HomePage;