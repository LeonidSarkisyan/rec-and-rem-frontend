import React, {FC, useEffect, useRef, useState} from 'react';
import workspaceChooseAvatar from '../../../assets/images/workspace/plus.png'
import './WorkspaceAvatar.css'
import {Workspace} from "../../../types/workspace";
import avatarService from "../../../api/AvatarService";
import {useFetching} from "../../../hooks/useFetching";
import MyLoader from "../../UI/loaders/MyLoader";


interface WorkspaceAvatarProps {
    workspace: Workspace
}


const WorkspaceAvatar: FC<WorkspaceAvatarProps> = ({workspace}) => {

    const [screenShot, setScreenshot] = useState(undefined)

    const refFile = useRef<HTMLInputElement>(null)

    const {
        fetching: fetchingDownload,
        isLoading: isLoadingDownload,
        error: errorDownload,
        setError: setErrorDownload
    } = useFetching(async () => {
        if (refFile.current?.files) {
            const response = await avatarService.download_file(workspace.id)
            // @ts-ignore
            setScreenshot(response)
        }
    })

    const {fetching, isLoading, error, setError} = useFetching(async () => {
        if (refFile.current?.files) {
            const file = refFile.current?.files[0]
            if (file.type === 'image/jpeg' || file.type === 'image/png') {
                // @ts-ignore
                setScreenshot(window.URL.createObjectURL(refFile.current.files[0]))
                const response = await avatarService.upload_file(workspace.id, refFile.current.files[0])
            } else {
                alert('Допустимый расширения файла: jpg, jpeg, png!')
            }
        }
    })

    useEffect(() => {
        fetchingDownload()
    }, [])

    function chooseAvatar() {
        refFile.current?.click()
    }

    async function onChangeHandler() {
        await fetching()
    }
    
    return (
        <div className="workspace__avatar" onClick={() => chooseAvatar()}>
            <input type="file" style={{display: 'none'}} ref={refFile} onChange={() => onChangeHandler()}/>
            {(isLoadingDownload || isLoading) ?
                <MyLoader/>
                :
                <img
                    src={screenShot}
                    alt="Загрузить аватарку"
                    className="workspace__avatar__image"
                />
            }
        </div>
    );
};

export default WorkspaceAvatar;