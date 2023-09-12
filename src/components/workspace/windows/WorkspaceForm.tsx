import React, {useState, FC} from 'react';
import './WorkspaceForm.css'
import LightButton from "../../UI/buttons/LightButton";
import BaseInput from "../../UI/inputs/BaseInput";
import {useValidFormData} from "../../../hooks/useValidFormData";
import MyLoader from "../../UI/loaders/MyLoader";


interface WorkspaceFormProps {
    isLoading: boolean,
    createWorkspace(title: string, description: string): void
}


const WorkspaceForm: FC<WorkspaceFormProps> = ({createWorkspace, isLoading}) => {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const isValid = useValidFormData([title, description])

    function prepareWorkspaceData() {
        if (isValid) {
            createWorkspace(title, description)
        }
    }

    return (
        <div>
            <div className="workspace__form__inputs">
                <BaseInput value={title} setValue={setTitle} placeholder={'Название'} maxCount={30}/>
                <BaseInput value={description} setValue={setDescription} placeholder={'Описание'} maxCount={30}/>
            </div>
            <div className="workspace__form__button">
                {isLoading
                    ? <MyLoader/>
                    : <LightButton onClick={() => prepareWorkspaceData()}>
                        Создать
                    </LightButton>
                }
            </div>
        </div>
    );
};

export default WorkspaceForm