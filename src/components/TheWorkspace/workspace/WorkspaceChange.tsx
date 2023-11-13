import React, {FC, useEffect, useRef, useState} from 'react';
import './WorkspaceChange.css'
import {Workspace} from "../../../types/workspace";
import PointLoader from "../../UI/loaders/PointLoader";
import {useFetching} from "../../../hooks/useFetching";
import workspaceService from "../../../api/WorkspaceService";
import {useAdditionCSSClass} from "../../../hooks/useAdditionCSSClass";
import LinkUnderline from "../../UI/links/LinkUnderline";
import useClickOutside from "../../../hooks/useClickOutside";
import MyDropDawn from "../../UI/drop-dawns/MyDropDawn";


interface WorkspaceChangeProps {
    isLoading: boolean
    workspace?: Workspace
}


const WorkspaceChange: FC<WorkspaceChangeProps> = ({workspace, isLoading}) => {

    const ref = useRef(null)

    useClickOutside(() => {
        setShowWorkspacesList(false)
    }, ref)

    const [workspaces, setWorkspaces] = useState<Workspace[]>([])
    const [showWorkspacesList, setShowWorkspacesList] = useState<boolean>(false)

    const {fetching, isLoading: isLoadingFetching, error, setError, errorCode} = useFetching(async () => {
        const response = await workspaceService.get_all()
        setWorkspaces(response.data)
    })

    const classes = useAdditionCSSClass(
        'workspace__change', 'workspace__change__opened', showWorkspacesList
    )

    const classesArrow = useAdditionCSSClass(
        'workspace__change__image', 'workspace__change__image__active', showWorkspacesList
    )

    useEffect(() => {
        fetching()
    }, [])

    function toggleWorkspacesList() {
        setShowWorkspacesList(!showWorkspacesList)
    }

    return (
        <>
            <div className={classes} ref={ref}>
                <div className="workspace__change__title">
                    {isLoading ?
                        <PointLoader/>
                        :
                        <>{workspace?.title}</>
                    }
                </div>
                <svg onClick={() => toggleWorkspacesList()} className={classesArrow} xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 15 8" fill="none">
                    <path d="M1.75 1.125L7.5 6.875L13.25 1.125" stroke="#242424" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {showWorkspacesList &&
                    <div className="workspace__change__list">
                        {workspaces.map(workspace =>
                            <div className="workspace__change__list__item"
                                 key={workspace.id}
                                 onClick={() => setShowWorkspacesList(false)}
                            >
                                <LinkUnderline
                                    text={workspace.title}
                                    url={`/workspaces/${workspace.id}`}
                                />
                            </div>
                        )}
                    </div>
                }
            </div>
        </>

    );
};

export default WorkspaceChange;