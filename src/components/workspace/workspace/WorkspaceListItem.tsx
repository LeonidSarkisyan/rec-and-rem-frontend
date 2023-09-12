import React, {FC, useState} from 'react';
import './WorkspaceListItem.css'
import FolderButton from "../folder/FolderButton";
import WorkspaceSettingsButton from "./WorkspaceSettingsButton";
import LightButton from "../../UI/buttons/LightButton";
import {Workspace, WorkspaceUpdateBody} from "../../../types/workspace";
import BaseModal from "../../UI/modal/BaseModal";
import WorkspaceSettings from "../windows/WorkspaceSettings";
import {useFetching} from "../../../hooks/useFetching";
import workspaceService from "../../../api/WorkspaceService";


interface WorkspaceListItemProps {
    workspace: Workspace
}


const WorkspaceListItem: FC<WorkspaceListItemProps> = ({workspace}) => {

    const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false)

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

    }

    function openSettings() {
        setShowSettingsModal(true)
    }

    async function updateWorkspace(workspaceUpdateBody: WorkspaceUpdateBody) {
        await fetching(workspaceUpdateBody.id, workspaceUpdateBody)
    }

    return (
        <div className="workspace__card">
            <div className="workspace__card__title">{workspace.title}</div>
            <div className="workspace__card__description">{workspace.description}</div>
            <div className="workspace__card__buttons">
                <FolderButton/>
                <LightButton onClick={() => goToWorkspace()}>
                    Перейти
                </LightButton>
            </div>
            <div onClick={() => openSettings()}>
                <WorkspaceSettingsButton/>
            </div>
            <BaseModal
                show={showSettingsModal}
                setShow={setShowSettingsModal}
                title={workspace.title}
            >
                <WorkspaceSettings workspace={workspace} save={updateWorkspace} isLoading={isLoading}/>
            </BaseModal>
        </div>
    );
};

export default WorkspaceListItem;