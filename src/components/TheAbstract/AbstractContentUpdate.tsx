import React, {FC, useEffect, useRef, useState} from 'react';
import './AbstractContent'
import {Abstract} from "../../types/abstract";
import {Content} from "../../types/content";
import {useFetching} from "../../hooks/useFetching";
import abstractService from "../../api/AbstractService";
import MyLoader from "../UI/loaders/MyLoader";
import DynamicContentUpdate from "../Contents/DynamicContentUpdate";
import {Folder} from "../../types/folder";
import './AbstractContent.css'
import avatarService from "../../api/AvatarService";
import AbstractSideMenu from "./AbstractSideMenu";


interface AbstractContentUpdateProps {
    folder?: Folder
    abstract: Abstract
}

const allowedDeleteTypes =  ['text', 'title', 'header', 'list', 'numeric_list', 'quote']

const AbstractContentUpdate: FC<AbstractContentUpdateProps> = ({abstract, folder}) => {

    const refAbstract = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState<number>(1000)
    const [canSave, setCanSave] = useState<boolean>(false)
    const [firstCanSave, setFirstCanSave] = useState<boolean>(true)

    useEffect(() => {
        window.onbeforeunload = function() {
            if (canSave) {
                return 'You have unsaved changes!';
            }
        }
    }, []);

    useEffect(() => {
        if (refAbstract.current) {
            setHeight(window.innerHeight - refAbstract.current.getBoundingClientRect().top - 20)
        }
    }, [])

    const [focusIndex, setFocusIndex] = useState<number>(-1)
    const [content, setContent] = useState<Content[]>([])

    useEffect(() => {
        console.log('ёпта')
        if (firstCanSave) {
            setFirstCanSave(false)
        } else {
            setCanSave(true)
        }
    }, [content])

    const {fetching, isLoading} = useFetching(async () => {
        localStorage.setItem("old_content", JSON.stringify(content))
        const response = await abstractService.get_content(abstract.id)
        setContent(response.data)
        localStorage.setItem(String(abstract.id), JSON.stringify(response.data))
        setCanSave(false)
        setFirstCanSave(true)
    })

    useEffect(() => {

        // @ts-ignore
        let oldAbstract = JSON.parse(localStorage.getItem("current_abstract"))

        if (oldAbstract && content.length > 0) {
            console.log('вот конспект -', oldAbstract)
            console.log('вот контент -', content)
            abstractService.set_content(oldAbstract.id, JSON.stringify(content))
        }

        fetching()

        return () => {
            localStorage.setItem("current_abstract", JSON.stringify(abstract))
        }
    }, [abstract])

    function save(contentObject: Content, data: {[key: string]: any}) {
        const indexSavedContentObject = content.indexOf(contentObject)
        const newContent = content.slice()
        newContent[indexSavedContentObject] = Object.assign(newContent[indexSavedContentObject], data)
        setContent(newContent)
        localStorage.setItem(String(abstract.id), JSON.stringify(newContent))
    }
    
    function createParagraph(contentObject: Content, focus: boolean = true) {
        // @ts-ignore
        const oldContent: Content[] = JSON.parse(localStorage.getItem(String(abstract.id)))
        const ourContentObject = oldContent.filter((value, index) => {
            if (value.id === contentObject.id) {

                const newContentObject = {
                    id: Date.now(),
                    type: 'text',
                    text: ''
                }

                if (contentObject.type !== 'list' && contentObject.type !== 'numeric_list') {
                    const newContent = [
                        ...oldContent.slice(0, index + 1),
                        newContentObject,
                        ...oldContent.slice(index + 1)
                    ]
                    localStorage.setItem(String(abstract.id), JSON.stringify(newContent))
                    setContent(newContent)
                    if (focus) {
                        setFocusIndex(index + 1)
                    } else {
                        setFocusIndex(index)
                    }
                } else {
                    newContentObject.type = contentObject.type
                    if (contentObject.text) {
                        const newContent = [
                            ...oldContent.slice(0, index + 1),
                            newContentObject,
                            ...oldContent.slice(index + 1)
                        ]
                        localStorage.setItem(String(abstract.id), JSON.stringify(newContent))
                        setContent(newContent)
                        if (focus) {
                            setFocusIndex(index + 1)
                        } else {
                            setFocusIndex(index)
                        }
                    } else {
                        save(contentObject, {type: "text"})
                    }
                }
            }
        })
    }

    function deleteParagraph(contentObject: Content) {
        // @ts-ignore
        const oldContent: Content[] = JSON.parse(localStorage.getItem(String(abstract.id)))
        const ourContentObject = oldContent.filter((value, index) => {
            if (value.id === contentObject.id) {
                if (index + 1 !== oldContent.length || allowedDeleteTypes.includes(oldContent[index - 1].type)) {
                    const newContent = oldContent.filter(value => {
                        return value.id !== contentObject.id
                    })
                    localStorage.setItem(String(abstract.id), JSON.stringify(newContent))
                    setContent(newContent)
                    setFocusIndex(index - 1)
                }
            }
        })
    }

    function focusRegarding(contentObject: Content, step: number) {
        // @ts-ignore
        const oldContent: Content[] = JSON.parse(localStorage.getItem(String(abstract.id)))
        const ourContentObject = oldContent.filter((value, index) => {
            if (value.id === contentObject.id) {
                console.log('index =', index)
                setFocusIndex(index + step)
            }
        })
    }

    const {fetching: fetchingSave, isLoading: isLoadingSave} = useFetching(async () => {
        const response = await abstractService.set_content(abstract.id, JSON.stringify(content))
        console.log(response.data)
        setCanSave(false)
    })

    async function saveContent() {
        await fetchingSave()
    }

    return (
        <div ref={refAbstract} className="abstract__content" style={{height: height}}>
            <div className="abstract__content__path">
                <span className="abstract__content__path__folder">
                    {folder?.title}
                </span>
                {'   >   '}
                <span className="abstract__content__path__abstract">
                    {abstract.title}
                </span>
            </div>
            {isLoading ?
                <MyLoader/>
                :
                <div className="abstract__content__inner">
                    {content.map((contentObject, index) =>
                        <div key={contentObject.id}>
                            <DynamicContentUpdate
                                beforeContentObject={content[index - 1]}
                                setFocusIndex={indexFocus => setFocusIndex(indexFocus)}
                                focusRegarding={focusRegarding}
                                index={index}
                                focusIndex={focusIndex}
                                createParagraph={createParagraph}
                                deleteParagraph={deleteParagraph}
                                save={save}
                                contentObject={contentObject}
                            />
                        </div>
                    )}
                </div>
            }
            <AbstractSideMenu
                isLoadingSave={isLoadingSave}
                canSave={canSave}
                saveContent={saveContent}
            />
        </div>
    );
};

export default AbstractContentUpdate;