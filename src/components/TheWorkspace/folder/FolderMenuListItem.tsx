import React, {FC, useState, MouseEvent, useEffect} from 'react';
import './FolderMenuListItem.css'
import {Folder, FolderUpdateBody} from "../../../types/folder";
import folderIcon from '../../../assets/images/workspace/folder.png'
import settings from "../../../assets/images/workspace/settings.png";
import BaseModal from "../../UI/modal/BaseModal";
import FolderSettings from "../../workspace/folder/FolderSettings";
import {useFetching} from "../../../hooks/useFetching";
import folderService from "../../../api/FolderService";
import AbstractWindow from "../abstract/AbstractWindow";
import NewDropDown from "../../UI/drop-dawns/NewDropDown";
import {Abstract} from "../../../types/abstract";
import abstractService from "../../../api/AbstractService";
import abstractIcon from '../../../assets/images/workspace/abstract.png'
import AbstractUpload from "../abstract/AbstractUpload";


interface FolderMenuListItemProps {
    folder: Folder
    deleteFolder(folderId: number): void
    chooseAbstract(abstract: Abstract, folder: Folder): void
}


const FolderMenuListItem: FC<FolderMenuListItemProps> = ({folder, deleteFolder, chooseAbstract}) => {

    const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false)
    const [showAbstract, setShowAbstract] = useState<boolean>(false)
    const [showAbstractUpload, setShowAbstractUpload] = useState<boolean>(false)

    const [abstracts, setAbstracts] = useState<Abstract[]>([])

    const {
        fetching: fetchingAbstracts,
        isLoading: isLoadingAbstracts,
        error: errorAbstracts,
        setError: setErrorAbstracts
    } = useFetching(async() => {
        const response = await abstractService.get_all_by_folder_id(folder.id)
        setAbstracts(response.data)
    })

    useEffect(() => {
        fetchingAbstracts()
    }, [])

    function addNewAbstract(newAbstract: Abstract) {
        setAbstracts([...abstracts, newAbstract])
    }

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

    async function updateFolder(folderUpdateBody: FolderUpdateBody) {
        await fetching(folderUpdateBody.id, folderUpdateBody)
    }

    const openSettings = (event: MouseEvent<HTMLImageElement>) => {
        event.stopPropagation()
        setShowSettingsModal(true)
    }

    function closeSettings() {
        setShowSettingsModal(false)
        deleteFolder(folder.id)
    }

    function deleteAbstract(abstractId: number) {
        setAbstracts(abstracts.filter(abstract => abstract.id !== abstractId))
    }

    function openAbstractUpload() {
        setShowAbstractUpload(true)
    }

    function uploadAbstract(abstract: Abstract) {
        setAbstracts([...abstracts, abstract])
        setShowAbstractUpload(false)
    }
    
    return (
        <div className="folder__menu__list__item__container">
            <div className="folder__menu__list__item" onClick={() => setShowAbstract(!showAbstract)}>
                <img src={folderIcon} alt="Каталог" className="folder_menu_list_item__image"/>
                <div className="folder__menu__list__item__title">
                    {folder.title}
                </div>
                <div className="folder__menu__list__item__count">
                    <div>{abstracts.length}</div>
                </div>
                <img
                    onClick={event => openSettings(event)}
                    src={settings}
                    alt="Открыть настройки каталога"
                    className="folder__item__settings folder__menu__list__item__settings"
                />
            </div>
            <BaseModal
                title={folder.title}
                show={showSettingsModal}
                setShow={setShowSettingsModal}
            >
                <FolderSettings
                    isLoading={isLoading}
                    save={updateFolder}
                    folder={folder}
                    closeSettings={closeSettings}
                />
            </BaseModal>
            <NewDropDown isOpen={showAbstract}>
                <AbstractWindow
                    addNewAbstract={addNewAbstract}
                    folder={folder}
                    chooseAbstract={chooseAbstract}
                    uploadAbstract={() => openAbstractUpload()}
                    deleteAbstract={deleteAbstract}
                    abstracts={abstracts}
                />
            </NewDropDown>
            <BaseModal
                title={'Загрузить открытый конспект'}
                show={showAbstractUpload}
                setShow={setShowAbstractUpload}
            >
                <AbstractUpload uploadAbstract={uploadAbstract} folder={folder}/>
            </BaseModal>
        </div>
    );
};

export default FolderMenuListItem;