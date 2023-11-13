import React, {FC, useEffect, useState} from 'react';
import BaseInput from "../../UI/inputs/BaseInput";
import AuthError from "../../auth/AuthError";
import MyLoader from "../../UI/loaders/MyLoader";
import LightButton from "../../UI/buttons/LightButton";
import {useFetching} from "../../../hooks/useFetching";
import folderService from "../../../api/FolderService";
import {Folder} from "../../../types/folder";
import {Workspace} from "../../../types/workspace";
import {Abstract} from "../../../types/abstract";
import abstractService from "../../../api/AbstractService";


interface AbstractUploadProps {
    uploadAbstract(abstract: Abstract): void
    folder: Folder
}


const AbstractUpload: FC<AbstractUploadProps> = ({folder,  uploadAbstract}) => {

    const [urlOpen, setUrlOpen] = useState<string>('')
    const [notCanUpload, setNotCanUpload] = useState<boolean>(true)
    const countLengthCode = 14

    useEffect(() => {
        if (urlOpen.length === countLengthCode) {
            setNotCanUpload(false)
        } else {
            setNotCanUpload(true)
        }
    }, [urlOpen])

    const {fetching, isLoading, error, setError} = useFetching(async() => {
        const response = await abstractService.upload(urlOpen, folder.id)
        uploadAbstract(response.data)
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

export default AbstractUpload;