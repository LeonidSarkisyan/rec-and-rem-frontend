import React, {FC, useEffect, useState} from 'react';
import './FolderMenu.css'
import FolderMenuHeader from "./FolderMenuHeader";
import FolderMenuList from "./FolderMenuList";
import {useFetching} from "../../../hooks/useFetching";
import folderService from "../../../api/FolderService";
import {Folder} from "../../../types/folder";
import MyDropDawn from "../../UI/drop-dawns/MyDropDawn";
import MyLoader from "../../UI/loaders/MyLoader";
import FolderMenuForm from "./FolderMenuForm";
import {Abstract} from "../../../types/abstract";


interface FolderMenuProps {
    workspaceId?: number
    chooseAbstract(abstract: Abstract, folder: Folder): void
}


const FolderMenu: FC<FolderMenuProps> = ({workspaceId, chooseAbstract}) => {

    const [showFolderList, setShowFolderList] = useState<boolean>(true)
    const [folders, setFolders] = useState<Folder[]>([])

    const {fetching, isLoading, error, setError} = useFetching(async () => {
        if (workspaceId) {
            const response = await folderService.get_all_by_workspace_id(workspaceId)
            setFolders(response.data)
            setShowFolderList(true)
        }
    })

    const {
        fetching: fetchingCreate,
        isLoading: isLoadingCreate,
        error: errorCreate,
        setError: setErrorCreate
    } = useFetching(async (title: string) => {
        if (workspaceId) {
            const response = await folderService.create(title, workspaceId)
            const newFolder: Folder = {
                id: response.data,
                title: title,
                is_deleted: false,
                is_open: false,
                url_open: '',
                workspace_id: workspaceId
            }
            setFolders([newFolder, ...folders])
        }
    })

    useEffect(() => {
        if (workspaceId) {
            fetching()
        }
    }, [workspaceId])

    async function createFolder(title: string) {
        await fetchingCreate(title)
    }

    function deleteFolder(folderId: number) {
        setFolders(folders.filter(folder => folder.id !== folderId))
    }

    return (
        <div>
            <FolderMenuHeader bool={showFolderList} setIsOpen={() => setShowFolderList(!showFolderList)}/>
            {isLoading ?
                <MyLoader/>
                :
                <MyDropDawn isOpen={showFolderList}>
                    <FolderMenuForm isLoading={isLoadingCreate} createFolder={createFolder}/>
                        <FolderMenuList chooseAbstract={chooseAbstract} deleteFolder={deleteFolder} folders={folders}/>
                    <div style={{margin: '5px', opacity: 0}}>w</div>
                </MyDropDawn>
            }
        </div>
    );
};

export default FolderMenu;