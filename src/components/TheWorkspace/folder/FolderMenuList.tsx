import React, {FC} from 'react';
import './FolderMenuList.css'
import {Folder} from "../../../types/folder";
import FolderMenuListItem from "./FolderMenuListItem";
import {Abstract} from "../../../types/abstract";


interface FolderMenuListProps {
    folders: Folder[]
    deleteFolder(folderId: number): void
    chooseAbstract(abstract: Abstract, folder: Folder): void
}


const FolderMenuList: FC<FolderMenuListProps> = ({folders, deleteFolder, chooseAbstract}) => {
    return (
        <div className="folder__menu__list">
            {folders.map(folder =>
                <FolderMenuListItem
                    chooseAbstract={chooseAbstract}
                    deleteFolder={deleteFolder}
                    folder={folder}
                    key={folder.id}
                />
            )}
        </div>
    );
};

export default FolderMenuList;