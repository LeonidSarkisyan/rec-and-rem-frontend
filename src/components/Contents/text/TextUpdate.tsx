import React, {FC, KeyboardEvent, useEffect, useRef} from 'react';
import './TextUpdate.css'
import {Content} from "../../../types/content";
import ContentEditable, {ContentEditableEvent} from "react-contenteditable";


interface TextUpdateProps {
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


const TextUpdate: FC<TextUpdateProps> = (
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

    function onPasteHandler(event: React.ClipboardEvent<HTMLDivElement>) {
        console.log(refEdit.current?.innerText)
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
                onPaste={event => onPasteHandler(event)}
            />
        </div>
    );
};

export default TextUpdate;