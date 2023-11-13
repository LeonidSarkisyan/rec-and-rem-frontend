import React, {FC, useRef, useState} from 'react';
import './ContentMenu.css'
import ContentMenuList from "./ContentMenuList";
import useClickOutside from "../../../hooks/useClickOutside";


interface ContentMenuProps {
    deleteParagraph(): void
    showContentMenuList: boolean
    setShowContentMenuList(bool: boolean): void
}


const ContentMenu: FC<ContentMenuProps> = ({deleteParagraph, setShowContentMenuList, showContentMenuList}) => {

    const divRef = useRef<HTMLDivElement>(null)

    useClickOutside(() => {
        setShowContentMenuList(false)
    }, divRef)

    return (
        <div
            ref={divRef}
            className="content__menu"
            onClick={() => setShowContentMenuList(!showContentMenuList)}
        >
            <div className="content__menu__points">
                <div className="content__menu__point"/>
                <div className="content__menu__point"/>
                <div className="content__menu__point"/>
            </div>
            <span onClick={event => event.stopPropagation()}>
                {showContentMenuList &&
                    <ContentMenuList deleteParagraph={deleteParagraph}/>
                }
            </span>
        </div>
    );
};

export default ContentMenu;