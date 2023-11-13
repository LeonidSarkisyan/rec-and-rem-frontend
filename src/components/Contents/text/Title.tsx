import React, {ChangeEvent, FC, useEffect, useRef, KeyboardEvent, useState} from 'react';
import './Title.css'
import {Content} from "../../../types/content";
import ContentEditable, {ContentEditableEvent} from "react-contenteditable";
import sanitizeHtml from "sanitize-html";


interface TitleProps {
    contentObject: Content
    getText(value: string): void
    createNewParagraph(contentObject: Content, index: number): void
    indexFocus: number
    index: number
    getText(value: string): void
    saveText(contentObject: Content, value: string): void
    deleteText(contentObject: Content): void
    focusRegarding(contentObject: Content, index: number): void
}


const Title: FC<TitleProps> = (
    {
        contentObject,
        getText,
        createNewParagraph,
        index,
        indexFocus,
        saveText,
        deleteText,
        focusRegarding
    }) => {
    const refEdit = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (indexFocus === index) {
            console.log(index,'- надо сфокусить')
            refEdit.current?.focus()
            let text = contentObject.text
        }
    }, [indexFocus, index])

    const onContentChange = React.useCallback((event: ContentEditableEvent) => {
        const sanitizeConf = {
            allowedTags: ["b", "i", "a", "p"],
            allowedAttributes: { a: ["href"] }
        };
        saveText(contentObject, sanitizeHtml(event.currentTarget.innerHTML, sanitizeConf))
    }, [])

    function onKeyDownHandler(event: KeyboardEvent<HTMLDivElement>) {
        if (event.key == 'Enter') {
            event.preventDefault()
            createNewParagraph(contentObject, index)
        } else if (event.key == 'ArrowDown') {
            focusRegarding(contentObject, 1)
        }
    }

    return (
        <div className="input__base__content title__input">
            <ContentEditable
                innerRef={refEdit}
                spellCheck={false}
                className={"input__base__content"}
                html={contentObject.text}
                onKeyDown={event => onKeyDownHandler(event)}
                onChange={onContentChange}
                placeholder='Заголовок'
                disabled={false}
            />
        </div>
    );
};

export default Title;