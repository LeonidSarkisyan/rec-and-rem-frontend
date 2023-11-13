import React, {FC, KeyboardEvent, useEffect, useRef, useState} from 'react';
import './HeaderText.css'
import {Content} from "../../../types/content";
import ContentEditable, {ContentEditableEvent} from "react-contenteditable";


interface HeaderTextProps {
    index: number
    focusIndex: number
    contentObject: Content
    save(contentObject: Content, data: {[key: string]: any}): void
    createParagraph(contentObject: Content): void
    deleteParagraph(contentObject: Content): void
    focusRegarding(contentObject: Content, index: number): void
    showContentControl(bool: boolean): void
    countFocus: number
    setCountFocus(count: 0): void
}

const fontStyles = {
    1: 'header__text__first',
    2: 'header__text__second',
    3: 'header__text__third'
}

const HeaderText: FC<HeaderTextProps> = (
    {
        contentObject,
        createParagraph,
        save,
        deleteParagraph,
        index,
        focusIndex,
        focusRegarding,
        showContentControl,
        countFocus,
        setCountFocus
    }
) => {
    const refEdit = useRef<HTMLDivElement>(null)

    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [size, setSize] = useState<number>(1)
    const [fontClass, setFontClass] = useState<string>("")

    useEffect(() => {
        if (!Object.hasOwn(contentObject, "size")) {
            save(contentObject, {size: 1})
            setSize(1)
        } else {
            setSize(contentObject.size)
        }
    }, [])

    useEffect(() => {
        // @ts-ignore
        setFontClass(fontStyles[size])
    }, [size])

    useEffect(() => {
        if (focusIndex === index) {
            console.log('зафокусим', index)
            if (refEdit.current) {
                refEdit.current.focus()
                let sel = window.getSelection()
                sel?.selectAllChildren(refEdit.current)
                sel?.collapseToEnd()
            }
        }
    }, [index, focusIndex])

    useEffect(() => {
        if (countFocus) {
            if (refEdit.current) {
                refEdit.current.focus()
                let sel = window.getSelection()
                sel?.selectAllChildren(refEdit.current)
                sel?.collapseToEnd()
                setCountFocus(0)
            }
        }
    }, [countFocus])

    function setSizeHandler(event: React.MouseEvent<HTMLDivElement>, newSize: number) {
        event.preventDefault()
        console.log(newSize)
        save(contentObject, {size: newSize})
        setSize(newSize)
        refEdit.current?.focus()
    }

    function onContentChange(event: ContentEditableEvent) {
        save(contentObject, {text: event.currentTarget.innerHTML})
        showContentControl(event.currentTarget.innerHTML.startsWith('/'))
    }

    function onKeyDownHandler(event: KeyboardEvent<HTMLDivElement>) {
        if (event.key === 'Enter') {
            event.preventDefault()
            createParagraph(contentObject)
        } else if (event.key == 'Backspace') {
            if (event.currentTarget.innerHTML.length == 0) {
                event.preventDefault()
                deleteParagraph(contentObject)
            }
        } else if (event.key == 'ArrowUp') {
            event.preventDefault()
            focusRegarding(contentObject, -1)
        } else if (event.key == 'ArrowDown') {
            event.preventDefault()
            focusRegarding(contentObject, 1)
        }
    }

    return (
        <div className={`input__base__content header__text ${fontClass}`}>
            <ContentEditable
                onFocus={() => setShowMenu(true)}
                onBlur={() => setShowMenu(false)}
                innerRef={refEdit}
                spellCheck={false}
                className={"input__base__content"}
                html={contentObject.text}
                onKeyDown={event => onKeyDownHandler(event)}
                onChange={onContentChange}
                placeholder='Заголовок'
                disabled={false}
            />
            <div
                style={{opacity: showMenu ? 1: 0}}
                className="header__text__menu"
                onMouseDown={event => event.preventDefault()}
            >
                <div
                    onMouseDown={event => setSizeHandler(event, 1)}
                    className={
                    size === 1 ?
                        'header__text__menu__point header__text__menu__point__active'
                        : 'header__text__menu__point'
                }>
                    1
                </div>
                <div
                    onMouseDown={event => setSizeHandler(event, 2)}
                    className={
                    size === 2 ?
                        'header__text__menu__point header__text__menu__point__active'
                        : 'header__text__menu__point'
                }>
                    2
                </div>
                <div
                    onMouseDown={event => setSizeHandler(event, 3)}
                    className={
                    size === 3 ?
                        'header__text__menu__point header__text__menu__point__active'
                        : 'header__text__menu__point'
                }>
                    3
                </div>
            </div>
        </div>
    );
};

export default HeaderText;