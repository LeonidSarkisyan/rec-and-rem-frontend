import React, {FC} from 'react';
import './ContentControlListItem.css'
import {ContentPoint} from "../../../types/content";


interface ContentControlListItemProps {
    chooseIndex: number
    setChooseIndex(index: number): void
    contentMenuPoint: ContentPoint
    setType(type: string): void
    contentMenu: ContentPoint[]
}


const ContentControlListItem: FC<ContentControlListItemProps> = (
    {contentMenuPoint, setType, chooseIndex, setChooseIndex, contentMenu}
) => {
    return (
        <div
            onMouseEnter={() => setChooseIndex(contentMenu.indexOf(contentMenuPoint))}
            className="content__control__list__item"
            style={{background: contentMenu.indexOf(contentMenuPoint) === chooseIndex ? '#eee' : ''}}
            onClick={() => setType(contentMenuPoint.type)}
        >
            <img src={contentMenuPoint.icon} alt={contentMenuPoint.name} className="content__control__list__item__icon"/>
            <div className="content__control__list__item__name">
                {contentMenuPoint.name}
            </div>
        </div>
    );
};

export default ContentControlListItem;