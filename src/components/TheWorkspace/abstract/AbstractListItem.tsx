import React, {FC, useState} from 'react';
import './AbstractListItem.css'
import abstractIcon from '../../../assets/images/workspace/abstract.png'
import abstractSettingsIcon from '../../../assets/images/workspace/abstractSettings.png'
import {Abstract, AbstractUpdateBody} from "../../../types/abstract";
import BaseModal from "../../UI/modal/BaseModal";
import AbstractSettings from "./AbstractSettings";
import {useFetching} from "../../../hooks/useFetching";
import {Folder, FolderUpdateBody} from "../../../types/folder";
import abstractService from "../../../api/AbstractService";


interface AbstractListItemProps {
    abstract: Abstract
    folder: Folder
    deleteAbstract(abstractId: number): void
    chooseAbstract(abstract: Abstract, folder: Folder): void
}


const AbstractListItem: FC<AbstractListItemProps> = ({abstract, deleteAbstract, chooseAbstract, folder}) => {

    const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false)

    const {fetching, isLoading, error, setError} = useFetching(
        async(abstractId: number, abstractUpdateBody: AbstractUpdateBody) => {
            const response = await abstractService.update(abstractId, abstractUpdateBody)
            if (response.title != null) {
                abstract.title = response.title
            }
            if (response.is_open != null && response.unique_url != null) {
                abstract.is_open = response.is_open
                abstract.url_open = response.unique_url
            }
            setShowSettingsModal(false)
        })

    async function updateAbstract(abstractUpdateBody: AbstractUpdateBody) {
        await fetching(abstractUpdateBody.id, abstractUpdateBody)
    }

    function openSettings() {
        setShowSettingsModal(true)
    }

    function closeSettings() {
        setShowSettingsModal(false)
        deleteAbstract(abstract.id)
    }

    return (
        <>
            <div className="abstract__list__item">
                <span className="abstract__list__item__underline__container" onClick={() => chooseAbstract(abstract, folder)}>
                    <img src={abstractIcon} alt="Конспект" className="abstract__list__item__image"/>
                    <div className="abstract__list__item__title">
                        {abstract.title}
                    </div>
                </span>
                <img
                    onClick={() => openSettings()}
                    src={abstractSettingsIcon}
                    alt="Настройки конспекта"
                    className="abstract__list__item__settings"
                />
            </div>
            <BaseModal
                title={abstract.title}
                show={showSettingsModal}
                setShow={setShowSettingsModal}
            >
                <AbstractSettings
                    abstract={abstract}
                    isLoading={isLoading}
                    save={updateAbstract}
                    closeSettings={closeSettings}
                />
            </BaseModal>
        </>
    );
};

export default AbstractListItem;