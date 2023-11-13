import React, {FC, useEffect, useRef, useState} from 'react';
import './WorkspaceUpload.css';
import BaseInput from "../../UI/inputs/BaseInput";
import LightButton from "../../UI/buttons/LightButton";
import {useFetching} from "../../../hooks/useFetching";
import workspaceService from "../../../api/WorkspaceService";
import AuthError from "../../auth/AuthError";
import MyLoader from "../../UI/loaders/MyLoader";
import {Workspace} from "../../../types/workspace";


interface WorkspaceUploadProps {
    uploadWorkspace(workspace: Workspace): void
}

const WorkspaceUpload: FC<WorkspaceUploadProps> = ({uploadWorkspace}) => {
    const [urlOpen, setUrlOpen] = useState<string>('')
    const [notCanUpload, setNotCanUpload] = useState<boolean>(true)
    const countLengthCode = 10

    useEffect(() => {
        if (urlOpen.length === countLengthCode) {
            setNotCanUpload(false)
        } else {
            setNotCanUpload(true)
        }
    }, [urlOpen])

    const {fetching, isLoading, error, setError} = useFetching(async() => {
        const response = await workspaceService.upload(urlOpen)
        uploadWorkspace(response.data)
    })

    const uploadWorkspaceFetch = async () => {
        await fetching()
    }

    return (
        <div>
            <BaseInput
                value={urlOpen}
                setValue={setUrlOpen}
                placeholder={'Код'}
                maxCount={countLengthCode}
                startFocus={true}
            />
            <AuthError error={error} setError={setError}/>
            <div className="workspace__form__button">
                {isLoading
                    ? <MyLoader/>
                    : <LightButton onClick={() => uploadWorkspaceFetch()} isDisabled={notCanUpload}>
                        Загрузить
                    </LightButton>
                }
            </div>
        </div>
    );
};

export default WorkspaceUpload;