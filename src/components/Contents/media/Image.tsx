import React, {ChangeEvent, FC, KeyboardEvent, useEffect, useRef, useState} from 'react';
import './Image.css'
import ContentEditable, {ContentEditableEvent} from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import {Content} from "../../../types/content";
import imageService from "../../../api/ImageService";
import {text} from "stream/consumers";


interface ImageProps {
    contentObject: Content
    saveText(contentObject: Content, value: string): void
    save(contentObject: Content, data: {[key: string]: any}): void
}


const Image: FC<ImageProps> = ({contentObject, saveText, save}) => {
    const refEdit = useRef<HTMLDivElement>(null)
    const refImage = useRef<HTMLInputElement>(null)
    const [width, setWidth] = useState<number>(370)

    const [screenShot, setScreenshot] = useState<string>()
    const [showUploadAgainButton, setShowUploadAgainButton] = useState<boolean>(false)

    useEffect(() => {
        if (contentObject.size) {
            setWidth(contentObject.size)
        }
        const fetchImage = async () => {
            if (contentObject.image) {
                const response = await imageService.download_image(contentObject.image)
                setScreenshot(response)
            } else {
                chooseImage()
            }
        }
        fetchImage()
    }, [])

    const onContentChange = (event: ContentEditableEvent) => {
        save(contentObject, {text: event.currentTarget.innerHTML})
    }

    function onKeyDownHandler(event: KeyboardEvent<HTMLDivElement>) {
        if (event.key == 'Enter') {
            event.preventDefault()
        }
    }
    
    function chooseImage() {
        refImage.current?.click()
    }

    async function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            const file = event.target.files[0]
            if (file) {
                if (file.type === 'image/jpeg' || file.type === 'image/png') {
                    setScreenshot(window.URL.createObjectURL(file))
                    const response = await imageService.upload_image(file)
                    const key = response.data
                    save(contentObject, {image: key})
                } else {
                    alert('Допустимый расширения файла: jpg, jpeg, png!')
                }
            }
        }
    }

    function onChangeResizeHandler(event: ChangeEvent<HTMLInputElement>) {
        console.log(typeof event.target.value)
        setWidth(Number(event.target.value))
        save(contentObject, {size: Number(event.target.value)})
    }

    return (
        <div className="image"
             onMouseEnter={() => setShowUploadAgainButton(true)}
             onMouseLeave={() => setShowUploadAgainButton(false)}
        >
            <input type="file" style={{display: "none"}} ref={refImage} onChange={event => onChangeHandler(event)}/>
            {screenShot
                ?
                <div
                    className="image__choose__container"
                >
                    <div style={{position: 'relative'}}>
                        <img
                            src={screenShot}
                            style={{width: width}}
                            alt="Изображение"
                            className="image__choose__image"
                        />
                        {showUploadAgainButton &&
                            <div className="image__choose__menu">
                                <div className="resize image__choose__re__choose">
                                    <input
                                        value={width}
                                        min={160}
                                        max={740}
                                        type="range"
                                        onChange={event => onChangeResizeHandler(event)}
                                    />
                                </div>
                                <div className="image__choose__re__choose" onClick={chooseImage}>
                                    Загрузить новую
                                </div>
                            </div>
                        }
                    </div>
                </div>
                :
                <div className="image__choose" onClick={() => {chooseImage()}}>
                    Добавить картинку
                </div>
            }
            <div className="image__subtext">
                <ContentEditable
                    innerRef={refEdit}
                    spellCheck={false}
                    className={"input__base__content"}
                    html={contentObject.text}
                    onKeyDown={event => onKeyDownHandler(event)}
                    onChange={onContentChange}
                    placeholder='Подпись к изображению'
                    disabled={false}
                />
            </div>
        </div>
    );
};

export default Image;