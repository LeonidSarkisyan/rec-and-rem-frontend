import React from 'react';
import folder from '../../../assets/images/workspace/folder.png'
import './FolderButton.css'

const FolderButton = () => {
    return (
        <div className="folder__card">
            <img src={folder} alt="Показать все папки" className="folder__card_img"/>
            <div className="folder__card_text">Показать все папки</div>
        </div>
    );
};

export default FolderButton;