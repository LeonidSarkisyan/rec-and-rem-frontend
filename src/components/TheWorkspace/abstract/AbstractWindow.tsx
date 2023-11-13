import React, {FC, useEffect, useState} from 'react';
import AbstractList from "./AbstractList";
import AbstractForm from "./AbstractForm";
import './AbstractWindow.css'
import {useFetching} from "../../../hooks/useFetching";
import abstractService from "../../../api/AbstractService";
import {Abstract} from "../../../types/abstract";
import {Folder} from "../../../types/folder";
import BaseModal from "../../UI/modal/BaseModal";
import AbstractCreate from "./AbstractCreate";


interface AbstractProps {
    abstracts: Abstract[]
    deleteAbstract(abstractId: number): void
    uploadAbstract(): void
    chooseAbstract(abstract: Abstract, folder: Folder): void
    folder: Folder
    addNewAbstract(abstract: Abstract): void
}


const AbstractWindow: FC<AbstractProps> = ({
    folder,
    abstracts,
    deleteAbstract,
    uploadAbstract,
    chooseAbstract,
    addNewAbstract
}) => {

    const [showAbstractCreateModal, setShowAbstractCreateModal] = useState<boolean>(false)

    function createAbstract() {
        setShowAbstractCreateModal(true)
    }

    function preAddNewAbstract(abstract: Abstract) {
        setShowAbstractCreateModal(false)
        addNewAbstract(abstract)
    }

    return (
        <div className="abstract">
            <AbstractList
                folder={folder}
                chooseAbstract={chooseAbstract}
                deleteAbstract={deleteAbstract}
                abstracts={abstracts}
            />
            <AbstractForm
                uploadAbstract={() => uploadAbstract()}
                createAbstract={() => createAbstract()}
            />
            <BaseModal
                title={'Создание конспекта'}
                show={showAbstractCreateModal}
                setShow={setShowAbstractCreateModal}
            >
                <AbstractCreate
                    folder={folder}
                    addNewAbstract={preAddNewAbstract}
                />
            </BaseModal>
        </div>
    );
};

export default AbstractWindow;