import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import './ContentControlList.css'
import {ContentPoint} from "../../../types/content";
import ContentControlListItem from "./ContentControlListItem";
import headerIcon from '../../../assets/images/contents/header.png'
import imageIcon from '../../../assets/images/contents/image.png'
import albumIcon from '../../../assets/images/contents/album.png'
import codeIcon from '../../../assets/images/contents/code.png'
import listIcon from '../../../assets/images/contents/list.png'
import numericListIcon from '../../../assets/images/contents/numeric_list.png'
import quoteIcon from '../../../assets/images/contents/quote.png'
import {useAdditionCSSClass} from "../../../hooks/useAdditionCSSClass";


interface ContentControlListProps {
    top: number
    setType(type: string): void
    focusSelf(): void
}


const ContentControlList: FC<ContentControlListProps> = ({setType, focusSelf, top}) => {

    const ref = useRef<HTMLDivElement>(null)

    const [chooseIndex, setChooseIndex] = useState<number>(0)

    const [contentMenu, setContentMenu] = useState<ContentPoint[]>([
        {name: 'Заголовок', type: 'header', icon: headerIcon},
        {name: 'Изображение', type: 'image', icon: imageIcon},
        {name: 'Альбом', type: 'album', icon: albumIcon},
        {name: 'Код', type: 'code', icon: codeIcon},
        {name: 'Список', type: 'list', icon: listIcon},
        {name: 'Нумерованный список', type: 'numeric_list', icon: numericListIcon},
        {name: 'Цитата', type: 'quote', icon: quoteIcon}
    ])

    function onKeyDownHandler(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === 'ArrowDown') {
            event.preventDefault()
            if (chooseIndex + 1 !== contentMenu.length) {
                setChooseIndex(chooseIndex + 1)
            } else {
                setChooseIndex(0)
            }
        } else if (event.key === 'ArrowUp') {
            event.preventDefault()
            if (chooseIndex - 1 >= 0) {
                setChooseIndex(chooseIndex - 1)
            } else {
                setChooseIndex(contentMenu.length - 1)
            }
        } else if (event.key === 'Enter') {
            event.preventDefault()
            setType(contentMenu[chooseIndex].type)
        } else if (event.key === 'Backspace') {
            focusSelf()
        }
    }

    useEffect(() => {
        if (ref.current) {
            ref.current.focus()
        }
    }, [])

    return (
        <>
            <div
                style={{top: top}}
                ref={ref}
                className={`content__control__list`}
                onKeyDown={event => onKeyDownHandler(event)}
                tabIndex={0}
            >
                {contentMenu.map(contentMenuPoint =>
                    <ContentControlListItem
                        chooseIndex={chooseIndex}
                        setChooseIndex={setChooseIndex}
                        contentMenuPoint={contentMenuPoint}
                        setType={setType}
                        contentMenu={contentMenu}
                        key={contentMenu.indexOf(contentMenuPoint)}
                    />
                )}
            </div>
        </>
    );
};

export default ContentControlList;