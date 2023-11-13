import React, {FC, memo, useEffect, useState} from 'react';
import {Content} from "../../types/content";
import Title from "./text/Title";
import TextBase from "./text/TextBase";
import ContentControl from "./control/ContentControl";
import './DynamicContent.css'
import Image from "./media/Image";
import ContentMenu from "./control/ContentMenu";


const components = {
    title: Title,
    text: TextBase,
    image: Image
};

interface DynamicContentProps {
    index: number
    indexFocus: number
    contentObject: Content
    createNewParagraph(contentObject: Content, index: number): void
    saveText(contentObject: Content, value: string): void
    deleteText(contentObject: Content): void
    focusRegarding(contentObject: Content, index: number): void
    changeTypeContentType(contentObject: Content, type: string): void
    save(contentObject: Content, data: {[key: string]: any}): void
}

const DynamicContent: FC<DynamicContentProps> = (
    {
        save,
        contentObject,
        createNewParagraph,
        saveText,
        deleteText,
        index,
        indexFocus,
        focusRegarding,
        changeTypeContentType,
    }
) => {

    const [contentObjectState, setContentObjectState] = useState<Content>()
    const [showContentControl, setShowContentControl] = useState<boolean>(false)
    const [showContentList, setShowContentList] = useState<boolean>(false)
    const [showContentMenu, setShowContentMenu] = useState<boolean>(false)

    useEffect(() => {
        setContentObjectState(contentObject)
    }, [contentObjectState])

    useEffect(() => {
        if (contentObject.text.length === 0) {
            setShowContentControl(true)
        } else {
            setShowContentControl(false)
        }
    }, [])

    function preSaveText(contentObject: Content, value: string) {
        if (value.length === 0 || value.startsWith('/')) {
            setShowContentControl(true)
        } else {
            setShowContentControl(false)
        }
        setContentObjectState({...contentObject, text: value})
    }

    function openOrCloseContentList(bool: boolean) {
        setShowContentList(bool)
    }

    function changeType(type: string) {
        changeTypeContentType(contentObject, type)
    }

    function toggleContentMenu(bool: boolean) {
        setShowContentMenu(bool)
    }

    // @ts-ignore
    const Component = components[contentObject.type]

    return (
        <div
            className="dynamic__content"
            onMouseEnter={() => toggleContentMenu(true)}
            onMouseLeave={() => toggleContentMenu(false)}
        >
            {
                contentObject.type === 'text' &&
                showContentControl &&
                <ContentControl
                    top={2}
                    setYAndHeight={() => null}
                    focusSelf={() => null}
                    changeType={changeType}
                    showContentListProp={showContentList}
                />
            }
            <div className="dynamic__content__component">
                <Component
                    focusRegarding={focusRegarding}
                    indexFocus={indexFocus}
                    index={index}
                    save={save}
                    saveText={preSaveText}
                    contentObject={contentObject}
                    createNewParagraph={createNewParagraph}
                    deleteText={deleteText}
                    showContentControl={(bool: boolean) => openOrCloseContentList(bool)}
                />
            </div>
            {
                contentObjectState?.type !== 'title' &&
                showContentMenu &&
                <ContentMenu
                    showContentMenuList={false}
                    setShowContentMenuList={() => null}
                    deleteParagraph={() => null}
                />
            }
        </div>
    )
};

export default DynamicContent;