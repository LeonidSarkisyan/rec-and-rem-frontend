import React, {FC, useRef, useEffect, useState, SyntheticEvent} from 'react';
import './MyDropDown.css'
import {useAdditionCSSClass} from "../../../hooks/useAdditionCSSClass";


interface MyDropDawnProps {
    children: React.ReactNode
    isOpen: boolean,
    change?: number,
    className?: string
    classActiveAlways?: boolean
}

const MyDropDawn: FC<MyDropDawnProps> = (
    {children, isOpen, change, className, classActiveAlways}
) => {
    const childrenRef = useRef<HTMLHeadingElement>(null)
    const [height, setHeight] = useState<number | undefined>(0)
    const [heightChildren, setHeightChildren] = useState<number | undefined>(0)
    const [classesCSSStyles, setClassesCSSStyles] = useState<string>('container-dropdown')

    let classes = useAdditionCSSClass(
        'container-dropdown', className, classActiveAlways ? classActiveAlways : isOpen
    )

    useEffect(() => {
        if (isOpen) {
            setHeight(heightChildren)
        }
    })

    useEffect(() => {
        setHeightChildren(childrenRef.current?.clientHeight)
    })

    useEffect(() => {
        isOpen ? setHeight(heightChildren) : setHeight(0)
        setClassesCSSStyles(classes)
    })

    return (
        <div className={classesCSSStyles} style={{height: height}}>
            <div ref={childrenRef}>
                {children}
            </div>
        </div>
    );
};

export default MyDropDawn;