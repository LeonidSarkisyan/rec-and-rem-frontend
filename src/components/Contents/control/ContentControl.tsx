import React, {FC, useEffect, useRef, useState} from 'react';
import './ContentControl.css'
import ContentControlList from "./ContentControlList";
import useClickOutside from "../../../hooks/useClickOutside";


interface ContentControlProps {
    top: number
    showContentListProp: boolean
    changeType(type: string): void
    focusSelf(): void
    setYAndHeight(): void
}


const ContentControl: FC<ContentControlProps> = ({showContentListProp, changeType, focusSelf, setYAndHeight, top}) => {

    const ref = useRef<HTMLDivElement>(null)
    const refContainer = useRef<HTMLDivElement>(null)

    const [showContentList, setShowContentList] = useState<boolean>(false)

    useClickOutside(() => {
        setShowContentList(false)
    }, ref)

    useEffect(() => {
        setShowContentList(showContentListProp)
    }, [showContentListProp])

    function setType(type: string) {
        setShowContentList(false)
        changeType(type)
    }

    useEffect(() => {
        setYAndHeight()
    }, [showContentList])

    return (
        <div className="content__control" ref={refContainer}>
            {!showContentList &&
                <svg
                    onClick={() => setShowContentList(true)}
                    fill="currentColor"
                    height="20"
                    width="20"
                    viewBox="0 0 20 20"
                    className="content__control__plus"
                >
                    <path fillRule="evenodd" clipRule="evenodd" d="M7 9V16H9V9H16V7H9V0H7V7H0V9H7Z">

                    </path>
                </svg>
            }
            <div ref={ref}>
                {showContentList &&
                    <ContentControlList
                        top={top}
                        focusSelf={focusSelf}
                        setType={setType}
                    />}
            </div>
        </div>
    );
};

export default ContentControl;