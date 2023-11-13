import React, {FC, KeyboardEvent, useEffect, useRef, useState} from 'react';
import ContentEditable, {ContentEditableEvent} from "react-contenteditable";
import {Content} from "../../../types/content";
import './ListText.css'


interface ListTextProps {
    index: number
    focusIndex: number
    contentObject: Content
    beforeContentObject: Content
    save(contentObject: Content, data: {[key: string]: any}): void
    createParagraph(contentObject: Content): void
    deleteParagraph(contentObject: Content): void
    focusRegarding(contentObject: Content, index: number): void
    showContentControl(bool: boolean): void
    countFocus: number
    setCountFocus(count: 0): void
}


const ListText: FC<ListTextProps> = (
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
        setCountFocus,
        beforeContentObject
    }
) => {
    const refEdit = useRef<HTMLDivElement>(null)

    const [marginTop, setMarginTop] = useState<number>(24)

    useEffect(() => {
        if (beforeContentObject.type === 'list') {
            setMarginTop(12)
        }
        console.log(beforeContentObject)
    }, [])

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

    function onContentChange(event: ContentEditableEvent) {
        save(contentObject, {text: event.currentTarget.innerHTML})
    }

    function onKeyDownHandler(event: KeyboardEvent<HTMLDivElement>) {
        console.log(event.key)
        console.log(event.ctrlKey)
        if (event.key === 'Enter') {
            event.preventDefault()
            if (!contentObject.text) {
                save(contentObject, {type: 'text'})
            } else {
                createParagraph(contentObject)
            }
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
        <div
            style={{marginTop: marginTop}}
            className="input__base__content list__text text"
        >
            <div className="list__text__point"/>
            <ContentEditable
                innerRef={refEdit}
                spellCheck={false}
                className={"input__base__content list__text__input"}
                html={contentObject.text}
                onKeyDown={event => onKeyDownHandler(event)}
                onChange={onContentChange}
                placeholder='ewewq'
                disabled={false}
            />
        </div>
    );
};

export default ListText;