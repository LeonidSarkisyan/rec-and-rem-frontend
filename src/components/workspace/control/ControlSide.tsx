import React, {useEffect, useState} from 'react';
import './ControlSide.css'
import ControlButtons from "./ControlButtons";
import ControlSearch from "./ControlSearch";
import WorkspaceList from "../workspace/WorkspaceList";
import {Workspace} from "../../../types/workspace";
import BaseModal from "../../UI/modal/BaseModal";
import workspaceService from "../../../api/WorkspaceService";
import {useFetching} from "../../../hooks/useFetching";
import WorkspaceForm from "../windows/WorkspaceForm";
import WorkspaceUpload from "../windows/WorkspaceUpload";


const ControlSide = () => {

    const [workspaces, setWorkspaces] = useState<Workspace[]>([])

    const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false)

    const {fetching, isLoading, error, setError} = useFetching(async () => {
        const response = await workspaceService.get_all()
        setWorkspaces(response.data)
    })

    const {
        fetching: fetchingQuerySearch,
        isLoading: isLoadingQuerySearch,
        error: errorQuerySearch,
        setError: setErrorQuerySearch
    } = useFetching(async (querySearch: string) => {
        const response = await workspaceService.get_all(querySearch)
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

    useEffect(() => {
        fetching()
    }, [])

    function deleteWorkspace(workspaceId: number) {
        setWorkspaces(workspaces.filter(value => {
            return value.id !== workspaceId
        }))
    }

    function openWorkspaceForm() {
        setShowCreateModal(true)
    }

    function uploadWorkspace() {
        setShowUpdateModal(true)
    }

    function addUploadedWorkspace(workspace: Workspace) {
        setWorkspaces([workspace, ...workspaces])
        setShowUpdateModal(false)
    }

    return (
        <div className="container__side">
            <div className="title">
                Ваши рабочие пространства
            </div>
            <ControlButtons createWorkspace={openWorkspaceForm} uploadWorkspace={uploadWorkspace}/>
            <ControlSearch fetch={fetchingQuerySearch}/>
            <WorkspaceList
                workspaces={workspaces}
                error={error || errorQuerySearch}
                isLoading={isLoading || isLoadingQuerySearch}
                deleteWorkspace={deleteWorkspace}
            />
            <BaseModal show={showCreateModal} setShow={setShowCreateModal} title={'Создание рабочего пространства'}>
                <WorkspaceForm
                    createWorkspace={(title: string, description: string) => fetchingCreate(title, description)}
                    isLoading={isLoadingCreate}
                />
            </BaseModal>
            <BaseModal show={showUpdateModal} setShow={setShowUpdateModal} title={'Загрузить открытое рабочее пространство'}>
                <WorkspaceUpload uploadWorkspace={addUploadedWorkspace}/>
            </BaseModal>
        </div>
    );
};

export default ControlSide;