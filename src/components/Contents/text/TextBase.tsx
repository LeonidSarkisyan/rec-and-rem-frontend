import React, {FC, KeyboardEvent, memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import './TextBase.css'
import {Content} from "../../../types/content";
import ContentEditable, {ContentEditableEvent} from "react-contenteditable";
import sanitizeHtml from "sanitize-html";


interface TextBaseProps {
    indexFocus: number
    index: number
    contentObject: Content
    createNewParagraph(contentObject: Content, index: number): void
    saveText(contentObject: Content, value: string): void
    deleteText(contentObject: Content): void
    focusRegarding(contentObject: Content, index: number): void
    showContentControl(bool: boolean): void
}


const TextBase: FC<TextBaseProps> = (
    {
        contentObject,
        createNewParagraph,
        saveText,
        deleteText,
        index,
        indexFocus,
        focusRegarding,
        showContentControl
    }
) => {

    const refEdit = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (indexFocus === index) {
            console.log(index,'- надо сфокусить')
            refEdit.current?.focus()
            let text = contentObject.text
            contentObject.text = ''
            contentObject.text = text
        }
    }, [indexFocus, index])

    const onContentChange = useCallback((event: ContentEditableEvent) => {
        const sanitizeConf = {
            allowedTags: ["b", "i", "a", "p"],
            allowedAttributes: { a: ["href"] }
        };
        contentObject.text = event.currentTarget.innerHTML
        saveText(contentObject, sanitizeHtml(event.currentTarget.innerHTML, sanitizeConf))
        showContentControl(event.currentTarget.innerHTML.startsWith('/'))
    }, [])

    const onKeyDownHandler = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key == 'Enter') {
            event.preventDefault()
            createNewParagraph(contentObject, index)
        } else if (event.key == 'Backspace') {
            if (event.currentTarget.innerHTML.length == 0) {
                deleteText(contentObject)
            }
        } else if (event.key == 'ArrowUp') {
            focusRegarding(contentObject, -1)
        } else if (event.key == 'ArrowDown') {
            focusRegarding(contentObject, 1)
        }
    }

    return (
        <div className="input__base__content text">
            <ContentEditable
                innerRef={refEdit}
                spellCheck={false}
                className={"input__base__content"}
                html={contentObject.text}
                onKeyDown={event => onKeyDownHandler(event)}
                onChange={onContentChange}
                placeholder='Нажмите "/" для вызова меню'
                disabled={false}
            />
        </div>
    );
};

export default TextBase;