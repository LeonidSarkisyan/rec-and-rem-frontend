import React, {FC} from 'react';
import folder from '../../../assets/images/workspace/folder.png'
import './FolderButton.css'


interface FolderButtonProps {
    showFolderList(): void
}


const FolderButton: FC<FolderButtonProps> = ({showFolderList}) => {
    return (
        <div className="folder__card" onClick={() => showFolderList()}>
            <img src={folder} alt="Показать все папки" className="folder__card_img"/>
            <div className="folder__card_text">Показать все папки</div>
        </div>
    );
};

export default FolderButton;