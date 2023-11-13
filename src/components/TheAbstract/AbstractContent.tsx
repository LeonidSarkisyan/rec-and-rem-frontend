import React, {FC, memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import './AbstractContent.css'
import {useFetching} from "../../hooks/useFetching";
import {Abstract} from "../../types/abstract";
import abstractService from "../../api/AbstractService";
import {Content} from "../../types/content";
import DynamicContent from "../Contents/DynamicContent";
import {text} from "stream/consumers";


interface AbstractContentProps {
    abstract: Abstract
}

const AbstractContent: FC<AbstractContentProps> = ({abstract}) => {

    const [indexFocus, setIndexFocus] = useState<number>(0)
    const [content, setContent] = useState<Content[]>([])
    const [height, setHeight] = useState<number>(1000)
    const [id, setId] = useState<number>(1000)

    const refAbstract = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (refAbstract.current) {
            setHeight(window.innerHeight - refAbstract.current.getBoundingClientRect().top)
        }
    }, [])

    const {fetching, isLoading, error} = useFetching(async () => {
        const response = await abstractService.get_content(abstract.id)
        setContent(response.data)
        console.log(response.data)
        setId(response.data[response.data.length - 1].id + 1)
    })

    useEffect(() => {
        fetching()
    }, [abstract])

    const createNewParagraph = useCallback((contentObject: Content, index: number) => {
        let newContentObject: Content = {
            id: id,
            type: 'text',
            text: ''
        }

        setContent([...content, newContentObject])
        setId(id + 1)
    }, [content])

    function saveText(contentObject: Content, value: string) {
        const indexSavedContentObject = content?.indexOf(contentObject)
        const newContent = content?.slice()
        // @ts-ignore
        newContent[indexSavedContentObject].text = value
    }

    function save(contentObject: Content, data: {[key: string]: any}) {
        // @ts-ignore
        const indexSavedContentObject = content.indexOf(contentObject)
        const newContent = content.slice()
        newContent[indexSavedContentObject] = Object.assign(newContent[indexSavedContentObject], data)
    }

    function deleteText(contentObject: Content) {
        console.log(content)
    }

    function focusRegarding(contentObject: Content, index: number) {
        // const indexSavedContentObject = content.indexOf(contentObject)
        // setIndexFocus(indexSavedContentObject + index)
    }

    function changeTypeContentType(contentObject: Content, type: string) {
        const indexSavedContentObject = content.indexOf(contentObject)
        const newContent = content.slice()
        newContent[indexSavedContentObject].type = type
        newContent[indexSavedContentObject].text = ''
        setContent(newContent)
        console.log('бля')
        createNewParagraph(contentObject, indexSavedContentObject)
    }

    // @ts-ignore
    return (
        <div
            ref={refAbstract}
            className="abstract__content"
            style={{height: height}}
        >
            <div className="abstract__content__inner">
                {content.map((contentObject: Content, index) =>
                    <DynamicContent
                        key={contentObject.id}
                        save={save}
                        changeTypeContentType={changeTypeContentType}
                        focusRegarding={focusRegarding}
                        indexFocus={indexFocus}
                        index={index}
                        deleteText={deleteText}
                        saveText={saveText}
                        createNewParagraph={createNewParagraph}
                        contentObject={contentObject}
                    />)
                }
            </div>
        </div>
    );
};

export default AbstractContent;