import React, {FC} from 'react';
import './WorkspaceMenu.css'
import WorkspaceChange from "./WorkspaceChange";
import {Workspace} from "../../../types/workspace";
import AdditionalButtons from "./AdditionalButtons";
import FolderMenu from "../folder/FolderMenu";
import {Abstract} from "../../../types/abstract";
import {Folder} from "../../../types/folder";


interface WorkspaceMenuProps {
    isLoading: boolean
    workspace?: Workspace
    chooseAbstract(abstract: Abstract, folder: Folder): void
}


const WorkspaceMenu: FC<WorkspaceMenuProps> = ({workspace, isLoading, chooseAbstract}) => {
    return (
        <div className="workspace__menu">
            <WorkspaceChange isLoading={isLoading} workspace={workspace}/>
            <AdditionalButtons/>
            <FolderMenu chooseAbstract={chooseAbstract} workspaceId={workspace?.id}/>
        </div>
    );
};

export default WorkspaceMenu;