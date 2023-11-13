import React, {FC, useEffect, useState} from 'react';
import './FolderList.css'
import {Folder} from "../../../types/folder";
import FolderListItem from "./FolderListItem";
import MyLoader from "../../UI/loaders/MyLoader";


interface FolderListProps {
    folders: Folder[]
    isLoading: boolean
    deleteFolder(folderId: number): void
}


const FolderList: FC<FolderListProps> = ({folders, isLoading, deleteFolder}) => {

    return (
        <div className="folder__list">
            {isLoading ? <div className="folder__card__loader"><MyLoader/></div>
                :
                <>
                    {folders.length === 0 && <div className="folder__card__not">
                        У этого рабочего пространства пока нет каталогов
                    </div>}
                    {folders.length !== 0 && <>
                        {folders.map(folder =>
                            <FolderListItem key={folder.id} folder={folder} deleteFolder={deleteFolder}/>
                        )}
                    </>
                    }
                </>
            }
        </div>
    );
};

export default FolderList;