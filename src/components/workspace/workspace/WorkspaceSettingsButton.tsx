import React from 'react';
import settings from '../../../assets/images/workspace/settings.png'
import './WorkspaceSettingsButton.css'

const WorkspaceSettingsButton = () => {
    return (
        <div className="workspace__card__settings">
            <img src={settings} alt="Открыть настройки рабочего пространства" className="workspace__card__settings_img"/>
        </div>
    );
};

export default WorkspaceSettingsButton;