import React, {FC, KeyboardEvent, useEffect, useRef} from 'react';
import './TitleUpdate.css'
import ContentEditable, {ContentEditableEvent} from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import {Content} from "../../../types/content";


interface TitleUpdateProps {
    index: number
    focusIndex: number
    contentObject: Content
    save(contentObject: Content, data: {[key: string]: any}): void
    createParagraph(contentObject: Content): void
    focusRegarding(contentObject: Content, index: number): void
}


const TitleUpdate: FC<TitleUpdateProps> = (
    {contentObject, save, createParagraph, focusIndex, index, focusRegarding}
) => {
    const refEdit = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (focusIndex === index) {
            if (refEdit.current) {
                refEdit.current.focus()
                let sel = window.getSelection()
                sel?.selectAllChildren(refEdit.current)
                sel?.collapseToEnd()
            }
        }
    }, [index, focusIndex])

    function onContentChange(event: ContentEditableEvent) {
        save(contentObject, {text: event.currentTarget.innerHTML})
    }

    function onKeyDownHandler(event: KeyboardEvent<HTMLDivElement>) {
        if (event.key === 'Enter') {
            event.preventDefault()
            createParagraph(contentObject)
        } else if (event.key == 'ArrowDown') {
            event.preventDefault()
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

export default TitleUpdate;