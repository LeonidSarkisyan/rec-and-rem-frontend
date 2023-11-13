import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import './DynamicContent.css'
import {Content} from "../../types/content";
import TitleUpdate from "./text/TitleUpdate";
import TextUpdate from "./text/TextUpdate";
import ContentControl from "./control/ContentControl";
import ContentMenu from "./control/ContentMenu";
import Image from "./media/Image";
import HeaderText from "./text/HeaderText";
import ListText from "./text/ListText";
import NumericListText from "./text/NumericListText";



const components = {
    title: {component: TitleUpdate},
    text: {component: TextUpdate},
    image: {component: Image},
    header: {component: HeaderText},
    list: {component: ListText},
    numeric_list: {component: NumericListText}
}

const textTypes = ['text', 'header', 'list', 'numeric_list']

interface DynamicContentUpdateProps {
    index: number
    focusIndex: number
    setFocusIndex(index: number): void
    contentObject: Content
    beforeContentObject: Content
    save(contentObject: Content, data: {[key: string]: any}): void
    createParagraph(contentObject: Content, focus?: boolean): void
    deleteParagraph(contentObject: Content): void
    focusRegarding(contentObject: Content, index: number): void
}

const DynamicContentUpdate: FC<DynamicContentUpdateProps> = (
    {
        beforeContentObject,
        contentObject,
        save,
        createParagraph,
        deleteParagraph,
        focusIndex,
        index,
        focusRegarding,
        setFocusIndex
    }
) => {
    const ref = useRef<HTMLDivElement>(null)

    const [showContentControl, setShowContentControl] = useState<boolean>(false)
    const [showContentList, setShowContentList] = useState<boolean>(false)
    const [showContentMenu, setShowContentMenu] = useState<boolean>(false)
    const [showContentMenuList, setShowContentMenuList] = useState<boolean>(false)
    const [countFocus, setCountFocus] = useState<number>(0)
    const [top, setTop] =  useState<number>(0)

    useEffect(() => {
        if (contentObject.text.length === 0) {
            setShowContentControl(true)
        } else {
            setShowContentControl(false)
        }
    }, [contentObject])

    function changeType(type: string) {
        save(contentObject, {type: type, text: ''})
        if (!textTypes.includes(type)) {
            createParagraph(contentObject, !textTypes.includes(type))
        }
        setFocusIndex(index)
    }

    function toggleContentMenu(bool: boolean) {
        if (!showContentMenuList) {
            setShowContentMenu(bool)
        }
    }

    function openOrCloseContentList(bool: boolean) {
        setShowContentList(bool)
    }

    function focusSelf() {
        setShowContentList(false)
        setCountFocus(1)
    }

    function preSave(contentObject: Content, data: {[key: string]: any}) {
        if (data.hasOwnProperty('text')) {
            setShowContentControl(data.text.length === 0 || data.text === '/')
        }
        save(contentObject, data)
    }

    function setYAndHeight() {
        if (ref.current) {
            const coords = ref.current.getBoundingClientRect()
            if (coords.top > 550) {
                setTop(-324)
            } else {
                setTop(30)
            }
        }
    }

    useEffect(() => {
        setYAndHeight()
    }, [])

    useEffect(() => {
        setYAndHeight()
    }, [showContentControl])

    // @ts-ignore
    const Component = components[contentObject.type].component
    return (
        <div
            ref={ref}
            className="dynamic__content"
            onMouseEnter={() => toggleContentMenu(true)}
            onMouseLeave={() => toggleContentMenu(false)}
        >
            {
                contentObject.type === 'text' &&
                showContentControl &&
                <ContentControl
                    top={top}
                    setYAndHeight={setYAndHeight}
                    focusSelf={focusSelf}
                    changeType={changeType}
                    showContentListProp={showContentList}
                />
            }
            <div className="dynamic__content__component">
                <Component
                    beforeContentObject={beforeContentObject}
                    setCountFocus={setCountFocus}
                    countFocus={countFocus}
                    index={index}
                    focusIndex={focusIndex}
                    save={preSave}
                    contentObject={contentObject}
                    createParagraph={createParagraph}
                    deleteParagraph={deleteParagraph}
                    focusRegarding={focusRegarding}
                    showContentControl={(bool: boolean) => openOrCloseContentList(bool)}
                />
            </div>
            {
                contentObject?.type !== 'title' &&
                showContentMenu &&
                <ContentMenu
                    showContentMenuList={showContentMenuList}
                    setShowContentMenuList={setShowContentMenuList}
                    deleteParagraph={() => deleteParagraph(contentObject)}
                />
            }
        </div>
    );
};

export default DynamicContentUpdate;