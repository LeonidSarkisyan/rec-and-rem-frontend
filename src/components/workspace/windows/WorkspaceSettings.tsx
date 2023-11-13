import React, {FC, useEffect, useState} from 'react';
import './WorkspaceSettings.css'
import BaseInput from "../../UI/inputs/BaseInput";
import {Workspace, WorkspaceUpdateBody} from "../../../types/workspace";
import LightButton from "../../UI/buttons/LightButton";
import BaseSwitch from "../../UI/switch/BaseSwitch";
import MyDropDawn from "../../UI/drop-dawns/MyDropDawn";
import workspaceService from "../../../api/WorkspaceService";
import MyLoader from "../../UI/loaders/MyLoader";
import BaseDialog from "../../UI/modal/BaseDialog";
import {useFetching} from "../../../hooks/useFetching";


interface WorkspaceSettingsProps {
    isLoading: boolean,
    workspace: Workspace,
    save(workspaceUpdateBody: WorkspaceUpdateBody): void,
    closeSettings(): void
}


const WorkspaceSettings: FC<WorkspaceSettingsProps> = ({workspace, save, isLoading, closeSettings}) => {

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [urlOpen, setUrlOpen] = useState<string>('')

    const [notCanSave, setNotCanSave] = useState<boolean>(true)
    const [showDeleteDialog,  setShowDeleteDialog] = useState<boolean>(false)
    const [showCopyMessage, setShowCopyMessage] = useState<boolean>(false)

    const {fetching, isLoading: isLoadingDelete, error, setError} = useFetching(async(workspaceId: number) => {
        await workspaceService.delete(workspaceId)
    })

    useEffect(() => {
        setTitle(workspace.title)
        setDescription(workspace.description)
        setIsOpen(workspace.is_open)
        setUrlOpen(workspace.url_open)
    }, [])


    useEffect(() => {
        if (title.length === 0 || description.length === 0) {
            setNotCanSave(true)
        } else if (
            title !== workspace.title || description !== workspace.description || isOpen !== workspace.is_open
        ) {
            setNotCanSave(false)
        } else {
            setNotCanSave(true)
        }
    }, [title, description, isOpen])

    async function deleteWorkspace() {
        await fetching(workspace.id)
        setShowDeleteDialog(false)
        closeSettings()
    }

    async function changeIsOpen(bool: boolean) {
        if (bool) {
            await workspaceService.get_unique_url(workspace.id).then(value => {
                setUrlOpen(value.data)
                setIsOpen(bool)
            })
        } else {
            setIsOpen(bool)
        }
    }

    function saveWorkspace() {
        let updateWorkspace: WorkspaceUpdateBody = {id: workspace.id}
        if (title !== workspace.title) {
            updateWorkspace.title = title
        }
        if (description !== workspace.description) {
            updateWorkspace.description = description
        }
        if (isOpen !== workspace.is_open) {
            updateWorkspace.is_open = isOpen
        }
        save(updateWorkspace)
    }

    function copyUrlOpen() {
        setShowCopyMessage(true)
        navigator.clipboard.writeText(urlOpen)
    }

    return (
        <div>
            <BaseInput value={title} setValue={setTitle} placeholder={'Название'} maxCount={30}/>
            <BaseInput value={description} setValue={setDescription} placeholder={'Описание'} maxCount={60}/>
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
                Удалить рабочее пространство
            </div>
            <BaseDialog
                isLoading={isLoadingDelete}
                show={showDeleteDialog}
                setShow={setShowDeleteDialog}
                callback={deleteWorkspace}
                title={'Удаление рабочего пространства'}
                question={`Вы точно хотите удалить рабочее пространство "${workspace.title}"? Все конспекты будут удалены навсегда.`}
                textButton={'Удалить'}
            >

            </BaseDialog>
            <div className="workspace__form__button">
                {isLoading
                    ? <MyLoader/>
                    : <LightButton onClick={() => saveWorkspace()} isDisabled={notCanSave}>
                        Сохранить
                    </LightButton>
                }
            </div>
        </div>
    );
};

export default WorkspaceSettings;