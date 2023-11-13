import React, {FC, useEffect, useState} from 'react';
import './AbstractCreate.css'
import BaseInput from "../../UI/inputs/BaseInput";
import AuthError from "../../auth/AuthError";
import MyLoader from "../../UI/loaders/MyLoader";
import LightButton from "../../UI/buttons/LightButton";
import {useFetching} from "../../../hooks/useFetching";
import abstractService from "../../../api/AbstractService";
import {Abstract} from "../../../types/abstract";
import {Folder} from "../../../types/folder";


interface AbstractCreateProps {
    folder: Folder,
    addNewAbstract(abstract: Abstract): void
}

const AbstractCreate: FC<AbstractCreateProps> = ({folder, addNewAbstract}) => {

    const [title, setTitle] = useState<string>('')
    const [notCanUpload, setNotCanUpload] = useState<boolean>(true)

    const {
        fetching: fetchingCreate,
        isLoading: isLoadingCreate,
        error: error,
        setError: setError
    } = useFetching(async (title: string) => {
        const response = await abstractService.create(title, folder.id)
        const newAbstract: Abstract = {
            id: response.data,
            title: title,
            is_open: false,
            url_open: '',
            is_deleted: false,
        }
        addNewAbstract(newAbstract)
    })

    useEffect(() => {
        title.length > 0 ? setNotCanUpload(false) : setNotCanUpload(true)
    }, [title])

    async function createAbstract() {
        await fetchingCreate(title)
    }

    return (
        <div>
            <BaseInput
                value={title}
                setValue={setTitle}
                placeholder={'Название конспекта'}
                maxCount={30}
                startFocus={true}
            />
            <AuthError error={error} setError={setError}/>
            <div className="workspace__form__button">
                {isLoadingCreate
                    ? <MyLoader/>
                    : <LightButton onClick={() => createAbstract()} isDisabled={notCanUpload}>
                        Создать
                    </LightButton>
                }
            </div>
        </div>
    );
};

export default AbstractCreate;