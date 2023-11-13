import React, {FC, useEffect, useState} from 'react';
import './WorkspaceListItem.css'
import FolderButton from "../folder/FolderButton";
import SettingsButton from "./WorkspaceSettingsButton";
import LightButton from "../../UI/buttons/LightButton";
import {Workspace, WorkspaceUpdateBody} from "../../../types/workspace";
import BaseModal from "../../UI/modal/BaseModal";
import WorkspaceSettings from "../windows/WorkspaceSettings";
import {useFetching} from "../../../hooks/useFetching";
import workspaceService from "../../../api/WorkspaceService";
import FolderWindow from "../folder/FolderWindow";
import {useNavigate} from "react-router-dom";
import WorkspaceAvatar from "./WorkspaceAvatar";


interface WorkspaceListItemProps {
    workspace: Workspace,
    deleteWorkspace(workspaceId: number): void
}

export enum TypesAccess {
    private = 'Private',
    public = 'Public',
}

const WorkspaceListItem: FC<WorkspaceListItemProps> = ({workspace, deleteWorkspace}) => {

    const [showFolderList, setShowFolderList] = useState<boolean>(false)
    const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false)
    const [typeAccess, setTypeAccess] = useState<TypesAccess>()

    const navigate = useNavigate()

    useEffect(() => {
        if (workspace.is_open) {
            setTypeAccess(TypesAccess.public)
        } else {
            setTypeAccess(TypesAccess.private)
        }
    })

    const {fetching, isLoading, error, setError} = useFetching(
 async(workspaceId: number, workspaceUpdateBody: WorkspaceUpdateBody) => {
            const response = await workspaceService.update(workspaceId, workspaceUpdateBody)
                 if (response.title != null) {
                     workspace.title = response.title
                 }
                 if (response.description != null) {
                     workspace.description = response.description
                 }
                 if (response.is_open != null && response.unique_url != null) {
                     workspace.is_open = response.is_open
                     workspace.url_open = response.unique_url
                 }
                 setShowSettingsModal(false)
        })

    const goToWorkspace = () => {
        navigate(`/workspaces/${workspace.id}`)
    }

    function openSettings() {
        setShowSettingsModal(true)
    }

    function closeSettings() {
        setShowSettingsModal(false)
        deleteWorkspace(workspace.id)
    }

    async function updateWorkspace(workspaceUpdateBody: WorkspaceUpdateBody) {
        await fetching(workspaceUpdateBody.id, workspaceUpdateBody)
    }

    function openFolderList() {
        setShowFolderList(true)
    }

    return (
        <div className="workspace__card">
            <div className="workspace__card__inner">
                <WorkspaceAvatar workspace={workspace}/>
                <div>
                    <div className="workspace__card__title">{workspace.title}</div>
                    <div className="workspace__card__description">{workspace.description}</div>
                    <div className="workspace__card__buttons">
                        <FolderButton showFolderList={openFolderList}/>
                        <LightButton onClick={() => goToWorkspace()} className="workspace__card__buttons__go">
                            Перейти
                        </LightButton>
                    </div>
                    <div className="workspace__type__access">
                        {typeAccess}
                    </div>
                    <div onClick={() => openSettings()}>
                        <SettingsButton/>
                    </div>
                </div>
            </div>
            <BaseModal
                show={showSettingsModal}
                setShow={setShowSettingsModal}
                title={workspace.title}
            >
                <WorkspaceSettings
                    workspace={workspace}
                    save={updateWorkspace}
                    isLoading={isLoading}
                    closeSettings={closeSettings}
                />
            </BaseModal>
            <BaseModal show={showFolderList} setShow={setShowFolderList} title={`Каталоги ${workspace.title}`}>
                <FolderWindow workspace={workspace}/>
            </BaseModal>
        </div>
    );
};

export default WorkspaceListItem;