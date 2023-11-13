import React, {FC, useEffect, useRef, useState} from 'react';
import BaseInput from "../../UI/inputs/BaseInput";
import LightButton from "../../UI/buttons/LightButton";
import {useFetching} from "../../../hooks/useFetching";
import workspaceService from "../../../api/WorkspaceService";
import AuthError from "../../auth/AuthError";
import MyLoader from "../../UI/loaders/MyLoader";
import {Folder} from "../../../types/folder";
import folderService from "../../../api/FolderService";
import {Workspace} from "../../../types/workspace";


interface FolderUploadProps {
    uploadFolder(folder: Folder): void
    workspace: Workspace
}

const FolderUpload: FC<FolderUploadProps> = ({uploadFolder, workspace}) => {
    const [urlOpen, setUrlOpen] = useState<string>('')
    const [notCanUpload, setNotCanUpload] = useState<boolean>(true)
    const countLengthCode = 12

    useEffect(() => {
        if (urlOpen.length === countLengthCode) {
            setNotCanUpload(false)
        } else {
            setNotCanUpload(true)
        }
    }, [urlOpen])

    const {fetching, isLoading, error, setError} = useFetching(async() => {
        const response = await folderService.upload(urlOpen, workspace.id)
        uploadFolder(response.data)
    })

    const uploadFolderFetch = async () => {
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
                    : <LightButton onClick={() => uploadFolderFetch()} isDisabled={notCanUpload}>
                        Загрузить
                    </LightButton>
                }
            </div>
        </div>
    );
};

export default FolderUpload;