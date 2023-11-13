import React, {FC, useRef} from 'react';
import './FolderMenuHeader.css'


interface FolderMenuHeaderProps {
    bool: boolean
    setIsOpen(bool: boolean): void
}


const FolderMenuHeader: FC<FolderMenuHeaderProps> = ({setIsOpen, bool}) => {

    const arrowRef = useRef<HTMLHeadingElement>(null)

    const onClickHandler = () => {
        if (arrowRef.current) {
            if (bool) {
                arrowRef.current.classList.add('folder__menu__header__arrow__active')
            } else {
                arrowRef.current.classList.remove('folder__menu__header__arrow__active')
            }
        }
        setIsOpen(bool)
    }

    return (
        <div className="folder__menu__header">
            <div className="folder__menu__header__title">
                Каталог
            </div>
            <div ref={arrowRef}>
                <svg onClick={() => onClickHandler()} className="folder__menu__header__arrow" xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
                    <path opacity="0.5" d="M12 6L6.5 1L1 6" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    );
};

export default FolderMenuHeader;