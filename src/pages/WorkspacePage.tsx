import React, {useEffect, useState} from 'react';
import './WorkspacePage.css'
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import {Workspace} from "../types/workspace";
import workspaceService from "../api/WorkspaceService";
import WorkspaceMenu from "../components/TheWorkspace/workspace/WorkspaceMenu";
import NotFound from "./NotFound";
import AbstractActive from "../components/TheAbstract/AbstractActive";
import {Abstract} from "../types/abstract";
import {Folder} from "../types/folder";


const WorkspacePage = () => {

    const [activeAbstract, setActiveAbstract] = useState<Abstract | undefined>(undefined)
    const [activeFolder, setActiveFolder] = useState<Folder| undefined>(undefined)
    const [workspace, setWorkspace] = useState<Workspace>()

    const {id: workspaceId} = useParams()

    const {fetching, isLoading, error, setError, errorCode} = useFetching(async () => {
        const response = await workspaceService.get_by_id(Number(workspaceId))
        setWorkspace(response?.data)
    })

    useEffect(() => {
        fetching()
    }, [workspaceId])

    function chooseAbstract(abstract: Abstract, folder: Folder) {
        setActiveFolder(folder)
        setActiveAbstract(abstract)
    }

    return (
        <div>
            {errorCode === 403 && <NotFound/>}
            {errorCode === 404 && <NotFound/>}
            {errorCode === 0 &&
                <div className="workspace__page__container">
                    <WorkspaceMenu chooseAbstract={chooseAbstract} isLoading={isLoading} workspace={workspace}/>
                    <AbstractActive abstract={activeAbstract} folder={activeFolder}/>
                </div>
            }
        </div>
    );
};

export default WorkspacePage;