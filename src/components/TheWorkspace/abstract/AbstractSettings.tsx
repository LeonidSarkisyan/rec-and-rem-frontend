import React, {FC, useEffect, useState} from 'react';
import './AbstractSettings.css'
import {useFetching} from "../../../hooks/useFetching";
import folderService from "../../../api/FolderService";
import {Folder, FolderUpdateBody} from "../../../types/folder";
import BaseInput from "../../UI/inputs/BaseInput";
import BaseSwitch from "../../UI/switch/BaseSwitch";
import MyDropDawn from "../../UI/drop-dawns/MyDropDawn";
import BaseDialog from "../../UI/modal/BaseDialog";
import MyLoader from "../../UI/loaders/MyLoader";
import LightButton from "../../UI/buttons/LightButton";
import abstractService from "../../../api/AbstractService";
import {Abstract, AbstractUpdateBody} from "../../../types/abstract";


interface AbstractSettingsProps {
    abstract: Abstract
    isLoading: boolean
    save(folderUpdateBody: FolderUpdateBody): void
    closeSettings(): void
}


const AbstractSettings: FC<AbstractSettingsProps> = ({abstract, isLoading, closeSettings, save}) => {

    const [title, setTitle] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [urlOpen, setUrlOpen] = useState<string>('')

    const [notCanSave, setNotCanSave] = useState<boolean>(true)
    const [showDeleteDialog,  setShowDeleteDialog] = useState<boolean>(false)
    const [showCopyMessage, setShowCopyMessage] = useState<boolean>(false)

    const {fetching, isLoading: isLoadingDelete, error, setError} = useFetching(async(abstractId: number) => {
        await abstractService.delete(abstractId)
    })

    useEffect(() => {
        setTitle(abstract.title)
        setIsOpen(abstract.is_open)
        setUrlOpen(abstract.url_open)
    }, [])

    useEffect(() => {
        if (title.length === 0) {
            setNotCanSave(true)
        } else if (
            title !== abstract.title || isOpen !== abstract.is_open
        ) {
            setNotCanSave(false)
        } else {
            setNotCanSave(true)
        }
    }, [title, isOpen])

    async function deleteAbstract() {
        await fetching(abstract.id)
        setShowDeleteDialog(false)
        closeSettings()
    }

    async function changeIsOpen(bool: boolean) {
        if (bool) {
            await abstractService.get_unique_url(abstract.id).then(value => {
                setUrlOpen(value.data)
                setIsOpen(bool)
            })
        } else {
            setIsOpen(bool)
        }
    }

    function saveAbstract() {
        let updateAbstract: AbstractUpdateBody = {id: abstract.id}
        if (title !== abstract.title) {
            updateAbstract.title = title
        }
        if (isOpen !== abstract.is_open) {
            updateAbstract.is_open = isOpen
        }
        save(updateAbstract)
    }

    function copyUrlOpen() {
        setShowCopyMessage(true)
        navigator.clipboard.writeText(urlOpen)
    }

    return (
        <div>
            <BaseInput value={title} setValue={setTitle} placeholder={'Название'} maxCount={30}/>
            <div className="workspace__form__opening">
                <div className="workspace__form__opening__title">
                    Открытый доступ:
                </div>
                <BaseSwitch bool={isOpen} setBool={changeIsOpen}/>
            </div>
            <div className="workspace__form__opening__container">
                <MyDropDawn isOpen={isOpen}>
                    <div className="workspace__form__opening__title workspace__form__opening">
                        Код на рабочее пространство:
                    </div>
                    <div className="workspace__form__opening__code">
                        <div className="workspace__form__opening__link" onClick={() => copyUrlOpen()}>
                            {urlOpen}
                        </div>
                        {showCopyMessage &&
                            <div className="workspace__form__opening__link__copy__message">
                                - скопировано!
                            </div>
                        }
                    </div>
                </MyDropDawn>
            </div>
            <div className="workspace__card__delete" onClick={() => setShowDeleteDialog(true)}>
                Удалить конспект
            </div>
            <BaseDialog
                isLoading={isLoadingDelete}
                show={showDeleteDialog}
                setShow={setShowDeleteDialog}
                callback={deleteAbstract}
                title={'Удаление конспекта'}
                question={`Вы точно хотите переместить конспект "${abstract.title}" в корзину?`}
                textButton={'Удалить'}
            >

            </BaseDialog>
            <div className="workspace__form__button">
                {isLoading
                    ? <MyLoader/>
                    : <LightButton onClick={() => saveAbstract()} isDisabled={notCanSave}>
                        Сохранить
                    </LightButton>
                }
            </div>
        </div>
    );
};

export default AbstractSettings;