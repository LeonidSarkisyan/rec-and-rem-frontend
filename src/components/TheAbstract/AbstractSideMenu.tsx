import React, {FC} from 'react';
import './AbstractSideMenu.css'
import saveIcon from '../../assets/images/abstractMenu/save.png'
import {useAdditionCSSClass} from "../../hooks/useAdditionCSSClass";
import MyLoader from "../UI/loaders/MyLoader";


interface AbstractSideMenuProps {
    canSave: boolean
    isLoadingSave: boolean
    saveContent(): void
}


const AbstractSideMenu: FC<AbstractSideMenuProps> = ({canSave, saveContent, isLoadingSave}) => {

    const classes = useAdditionCSSClass(
        "abstract__side__menu__save__image",
        "abstract__side__menu__save__image__not",
        !canSave
    )

    const onClickHandler = () => {
        if (canSave) {
            saveContent()
        }
    }

    return (
        <div className="abstract__side__menu">
            <div className="abstract__side__menu__save">
                {isLoadingSave ?
                    <MyLoader/>
                    :
                    <img
                        onClick={() => onClickHandler()}
                        className={classes}
                        src={saveIcon}
                        alt="Сохранить конспект"
                    />
                }
            </div>
        </div>
    );
};

export default AbstractSideMenu;