import React, {FC, useEffect, useState} from 'react';
import {Folder, FolderUpdateBody} from "../../../types/folder";
import folderImage from '../../../assets/images/workspace/folder.png'
import './FolderListItem.css'
import settings from '../../../assets/images/workspace/settings.png'
import BaseModal from "../../UI/modal/BaseModal";
import FolderSettings from "./FolderSettings";
import {useFetching} from "../../../hooks/useFetching";
import folderService from "../../../api/FolderService";
import {TypesAccess} from "../workspace/WorkspaceListItem";


interface FolderListItemProps {
    folder: Folder
    deleteFolder(folderId: number): void
}


const FolderListItem: FC<FolderListItemProps> = ({folder, deleteFolder}) => {

    const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false)

    const [typeAccess, setTypeAccess] = useState<TypesAccess>()

    const {fetching, isLoading, error, setError} = useFetching(
        async(folderId: number, folderUpdateBody: FolderUpdateBody) => {
            const response = await folderService.update(folderId, folderUpdateBody)
            if (response.title != null) {
                folder.title = response.title
            }
            if (response.is_open != null && response.unique_url != null) {
                folder.is_open = response.is_open
                folder.url_open = response.unique_url
            }
            setShowSettingsModal(false)
        })

    useEffect(() => {
        if (folder.is_open) {
            setTypeAccess(TypesAccess.public)
        } else {
            setTypeAccess(TypesAccess.private)
        }
    })

    async function updateFolder(folderUpdateBody: FolderUpdateBody) {
        await fetching(folderUpdateBody.id, folderUpdateBody)
    }

    function openSettings() {
        setShowSettingsModal(true)
    }

    function closeSettings() {
        setShowSettingsModal(false)
        deleteFolder(folder.id)
    }

    return (
        <div className="folder">
            <div className="folder__item">
                <img src={folderImage} alt="Иконка каталога" className="folder__card_img"/>
                <div className="folder__item__title">{folder.title}</div>
                <div className="folder__type__access">
                    {typeAccess}
                </div>
                <img
                    onClick={() => openSettings()}
                    src={settings}
                    alt="Открыть настройки каталога"
                    className="folder__item__settings"
                />
            </div>
            <BaseModal title={folder.title} show={showSettingsModal} setShow={setShowSettingsModal}>
                <FolderSettings isLoading={isLoading} save={updateFolder} folder={folder} closeSettings={closeSettings}/>
            </BaseModal>
        </div>
    );
};

export default FolderListItem;