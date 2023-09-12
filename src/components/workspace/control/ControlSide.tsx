import React, {useEffect, useState} from 'react';
import './ControlSide.css'
import ControlButtons from "./ControlButtons";
import ControlSearch from "./ControlSearch";
import WorkspaceList from "../workspace/WorkspaceList";
import {Workspace} from "../../../types/workspace";
import BaseModal from "../../UI/modal/BaseModal";
import WorkspaceService from "../../../api/WorkspaceService";
import workspaceService from "../../../api/WorkspaceService";
import {useFetching} from "../../../hooks/useFetching";
import auth_service from "../../../api/AuthService";
import WorkspaceForm from "../windows/WorkspaceForm";


const ControlSide = () => {

    const [workspaces, setWorkspaces] = useState<Workspace[]>([])

    const {fetching, isLoading, error, setError} = useFetching(async () => {
        const response = await workspaceService.get_all()
        setWorkspaces(response.data)
    })

    const {fetching: fetchingCreate, isLoading: isLoadingCreate} = useFetching(
        async (title: string, description: string) => {
            const response = await workspaceService.create(title, description)
            setShowCreateModal(false)

            const newWorkspace = {
                id: response.data,
                title: title,
                description: description,
                is_open: false,
                url_open: ''
            }
            setWorkspaces([newWorkspace, ...workspaces])
        }
    )

    const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false)

    useEffect(() => {
        fetching()
    }, [])

    function openWorkspaceForm() {
        setShowCreateModal(true)
    }

    function uploadWorkspace() {
        setShowUpdateModal(true)
    }

    return (
        <div className="container__side">
            <div className="title">
                Ваши рабочие пространства
            </div>
            <ControlButtons createWorkspace={openWorkspaceForm} uploadWorkspace={uploadWorkspace}/>
            <ControlSearch/>
            <WorkspaceList workspaces={workspaces} error={error} isLoading={isLoading}/>
            <BaseModal show={showCreateModal} setShow={setShowCreateModal} title={'Создание рабочего пространства'}>
                <WorkspaceForm
                    createWorkspace={(title: string, description: string) => fetchingCreate(title, description)}
                    isLoading={isLoadingCreate}
                />
            </BaseModal>
        </div>
    );
};

export default ControlSide;