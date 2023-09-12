import React, {FC, useEffect, useState} from 'react';
import './WorkspaceSettings.css'
import BaseInput from "../../UI/inputs/BaseInput";
import {Workspace, WorkspaceUpdateBody} from "../../../types/workspace";
import LightButton from "../../UI/buttons/LightButton";
import BaseSwitch from "../../UI/switch/BaseSwitch";
import MyDropDawn from "../../UI/drop-dawns/MyDropDawn";
import workspaceService from "../../../api/WorkspaceService";
import MyLoader from "../../UI/loaders/MyLoader";
import {useValidFormData} from "../../../hooks/useValidFormData";


interface WorkspaceSettingsProps {
    isLoading: boolean,
    workspace: Workspace,
    save(workspaceUpdateBody: WorkspaceUpdateBody): void,
}


const WorkspaceSettings: FC<WorkspaceSettingsProps> = ({workspace, save, isLoading}) => {

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [urlOpen, setUrlOpen] = useState<string>('')

    const [notCanSave, setNotCanSave] = useState<boolean>(true)

    const isValid = useValidFormData([title, description])

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

    async function changeIsOpen(bool: boolean) {
        if (bool) {
            const response = await workspaceService.get_unique_url(workspace.id)
            setUrlOpen(response.data)
        }
        setIsOpen(bool)
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

    return (
        <div>
            <BaseInput value={title} setValue={setTitle} placeholder={'Название'} maxCount={30}/>
            <BaseInput value={description} setValue={setDescription} placeholder={'Описание'} maxCount={30}/>
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
                    <div className="workspace__form__opening__link">
                        {urlOpen}
                    </div>
                </MyDropDawn>
            </div>
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