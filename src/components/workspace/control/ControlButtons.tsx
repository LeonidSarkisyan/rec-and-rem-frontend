import React, {FC} from 'react';
import './ControlButtons.css'
import LightButton from "../../UI/buttons/LightButton";


interface ControlButtonsProps {
    createWorkspace(): void,
    uploadWorkspace(): void
}


const ControlButtons: FC<ControlButtonsProps> = ({createWorkspace, uploadWorkspace}) => {

    return (
        <div className="control__buttons">
            <LightButton onClick={() => createWorkspace()}>Создать</LightButton>
            <div style={{marginLeft: 16}}/>
            <LightButton onClick={() => uploadWorkspace()}>Загрузить</LightButton>
        </div>
    );
};

export default ControlButtons;