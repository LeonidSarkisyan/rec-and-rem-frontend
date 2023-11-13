import React, {FC, useEffect, useState} from 'react';
import './FolderSettings.css'
import {Folder, FolderUpdateBody} from "../../../types/folder";
import BaseInput from "../../UI/inputs/BaseInput";
import BaseSwitch from "../../UI/switch/BaseSwitch";
import MyDropDawn from "../../UI/drop-dawns/MyDropDawn";
import BaseDialog from "../../UI/modal/BaseDialog";
import MyLoader from "../../UI/loaders/MyLoader";
import LightButton from "../../UI/buttons/LightButton";
import {useFetching} from "../../../hooks/useFetching";
import workspaceService from "../../../api/WorkspaceService";
import folderService from "../../../api/FolderService";


interface FolderSettingsProps {
    folder: Folder
    isLoading: boolean
    save(folderUpdateBody: FolderUpdateBody): void
    closeSettings(): void
}


const FolderSettings: FC<FolderSettingsProps> = ({folder, isLoading, closeSettings, save}) => {

    const [title, setTitle] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [urlOpen, setUrlOpen] = useState<string>('')

    const [notCanSave, setNotCanSave] = useState<boolean>(true)
    const [showDeleteDialog,  setShowDeleteDialog] = useState<boolean>(false)
    const [showCopyMessage, setShowCopyMessage] = useState<boolean>(false)

    const {fetching, isLoading: isLoadingDelete, error, setError} = useFetching(async(folderId: number) => {
        await folderService.delete(folderId)
    })

    useEffect(() => {
        setTitle(folder.title)
        setIsOpen(folder.is_open)
        setUrlOpen(folder.url_open)
    }, [])

    useEffect(() => {
        if (title.length === 0) {
            setNotCanSave(true)
        } else if (
            title !== folder.title || isOpen !== folder.is_open
        ) {
            setNotCanSave(false)
        } else {
            setNotCanSave(true)
        }
    }, [title, isOpen])

    async function deleteFolder() {
        await fetching(folder.id)
        setShowDeleteDialog(false)
        closeSettings()
    }

    async function changeIsOpen(bool: boolean) {
        if (bool) {
            await folderService.get_unique_url(folder.id).then(value => {
                setUrlOpen(value.data)
                setIsOpen(bool)
            })
        } else {
            setIsOpen(bool)
        }
    }

    function saveFolder() {
        let updateFolder: FolderUpdateBody = {id: folder.id}
        if (title !== folder.title) {
            updateFolder.title = title
        }
        if (isOpen !== folder.is_open) {
            updateFolder.is_open = isOpen
        }
        save(updateFolder)
    }

    function copyUrlOpen() {
        setShowCopyMessage(true)
        navigator.clipboard.writeText(urlOpen)
    }

    return (
        <div>
            <BaseInput value={title} setValue={setTitle} placeholder={'Название'} maxCount={30}/>
            <div className="workspace__form__opening">
                <div className="workspace__form__opening__title">
                    Открытый доступ:
                </div>
                <BaseSwitch bool={isOpen} setBool={changeIsOpen}/>
            </div>
            <div className="workspace__form__opening__container">
                <MyDropDawn isOpen={isOpen}>
                    <div className="workspace__form__opening__title workspace__form__opening">
                        Код на рабочее пространство:
                    </div>
                    <div className="workspace__form__opening__code">
                        <div className="workspace__form__opening__link" onClick={() => copyUrlOpen()}>
                            {urlOpen}
                        </div>
                        {showCopyMessage &&
                            <div className="workspace__form__opening__link__copy__message">
                                - скопировано!
                            </div>
                        }
                    </div>
                </MyDropDawn>
            </div>
            <div className="workspace__card__delete" onClick={() => setShowDeleteDialog(true)}>
                Удалить каталог
            </div>
            <BaseDialog
                isLoading={isLoadingDelete}
                show={showDeleteDialog}
                setShow={setShowDeleteDialog}
                callback={deleteFolder}
                title={'Удаление каталога'}
                question={`Вы точно хотите удалить каталог "${folder.title}"? Все конспекты будут удалены навсегда.`}
                textButton={'Удалить'}
            >

            </BaseDialog>
            <div className="workspace__form__button">
                {isLoading
                    ? <MyLoader/>
                    : <LightButton onClick={() => saveFolder()} isDisabled={notCanSave}>
                        Сохранить
                    </LightButton>
                }
            </div>
        </div>
    );
};

export default FolderSettings;