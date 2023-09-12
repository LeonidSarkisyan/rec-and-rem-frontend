import React, {FC, useRef, useEffect, useState} from 'react';
import './MyDropDown.css'


interface MyDropDawnProps {
    children: React.ReactNode
    isOpen: boolean
}

const MyDropDawn: FC<MyDropDawnProps> = ({children, isOpen}) => {
    const childrenRef = useRef<HTMLHeadingElement>(null)
    const [height, setHeight] = useState<number | undefined>(0)
    const [heightChildren, setHeightChildren] = useState<number | undefined>(0)

    useEffect(() => {
        if (isOpen) {
            setHeight(heightChildren)
        }
    })

    useEffect(() => {
        setHeightChildren(childrenRef.current?.scrollHeight)
    }, [childrenRef.current])

    useEffect(() => {
        isOpen ? setHeight(heightChildren) : setHeight(0)
    }, [isOpen])

    return (
        <div className={'container-dropdown'} style={{height: height}}>
            <div className={'children'} ref={childrenRef}>
                {children}
            </div>
        </div>
    );
};

export default MyDropDawn;