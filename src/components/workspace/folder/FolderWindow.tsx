import React, {FC, useEffect, useState} from 'react';
import './FolderWindow.css'
import {Workspace} from "../../../types/workspace";
import FolderList from "./FolderList";
import FolderForm from "./FolderForm";
import {Folder} from "../../../types/folder";
import {useFetching} from "../../../hooks/useFetching";
import folderService from "../../../api/FolderService";
import BaseError from "../../UI/errors/BaseError";
import FolderFormMenu from "./FolderFormMenu";
import workspaceService from "../../../api/WorkspaceService";
import BaseModal from "../../UI/modal/BaseModal";
import FolderUpload from "./FolderUpload";


interface FolderWindowProps {
    workspace: Workspace
}


const FolderWindow: FC<FolderWindowProps> = ({workspace}) => {

    const [folders, setFolders] = useState<Folder[]>([])
    const [showUploadWindow, setShowUploadWindow] = useState<boolean>(false)

    const {fetching, isLoading, error, setError} = useFetching(async () => {
        const response = await folderService.get_all_by_workspace_id(workspace.id)
        setFolders(response.data)
    })

    const {
        fetching: fetchingCreate,
        isLoading: isLoadingCreate,
        error: errorCreate,
        setError: setErrorCreate
    } = useFetching(async (title: string) => {
        const response = await folderService.create(title, workspace.id)
        const newFolder: Folder = {
            id: response.data,
            title: title,
            is_deleted: false,
            is_open: false,
            url_open: '',
            workspace_id: workspace.id
        }
        setFolders([newFolder, ...folders])
    })

    const {
        fetching: fetchingQuerySearch,
        isLoading: isLoadingQuerySearch,
        error: errorQuerySearch,
        setError: setErrorQuerySearch
    } = useFetching(async (querySearch: string) => {
        const response = await folderService.get_all_by_workspace_id(workspace.id, querySearch)
        console.log(response.data)
        setFolders(response.data)
    })

    async function createFolder(title: string) {
        await fetchingCreate(title)
    }

    function deleteFolder(folderId: number) {
        setFolders(folders.filter(value => value.id !== folderId))
    }

    function showUploadModalMethod() {
        setShowUploadWindow(true)
    }

    function addUploadedWorkspace(folder: Folder) {
        setFolders([folder, ...folders])
        setShowUploadWindow(false)
    }

    useEffect(() => {
        fetching()
    }, [])

    return (
        <div>
            <FolderForm createFolder={createFolder} isLoading={isLoadingCreate}/>
            <BaseError error={errorCreate} setError={setErrorCreate} className="drop__down"/>
            <FolderList
                deleteFolder={deleteFolder}
                folders={folders}
                isLoading={isLoading || isLoadingQuerySearch}
            />
            <FolderFormMenu
                showUploadModal={showUploadModalMethod}
                fetch={fetchingQuerySearch}
            />
            <BaseModal
                title={'Загрузить открытый каталог'}
                show={showUploadWindow}
                setShow={setShowUploadWindow}
            >
                <FolderUpload uploadFolder={addUploadedWorkspace} workspace={workspace}/>
            </BaseModal>
        </div>
    );
};

export default FolderWindow;