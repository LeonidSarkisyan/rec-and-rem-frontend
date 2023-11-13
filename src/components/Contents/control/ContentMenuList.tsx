import React, {FC} from 'react';
import './ContentMenuList.css'


interface ContentMenuListProps {
    deleteParagraph(): void
}


const ContentMenuList: FC<ContentMenuListProps> = ({deleteParagraph}) => {

    return (
        <div className="content__menu__list">
            <div className="content__menu__list__item" onClick={() => deleteParagraph()}>
                Удалить
            </div>
        </div>
    );
};

export default ContentMenuList;