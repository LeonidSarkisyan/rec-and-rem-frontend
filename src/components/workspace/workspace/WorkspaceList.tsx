import React, {useEffect, useRef, useState, FC} from 'react';
import './WorkspaceList.css'
import WorkspaceListItem from "./WorkspaceListItem";
import {Workspace} from "../../../types/workspace";
import MyLoader from "../../UI/loaders/MyLoader";


interface WorkspaceListProps {
    workspaces: Workspace[],
    isLoading: boolean,
    error: string,
    deleteWorkspace(workspaceId: number): void
}

const WorkspaceList: FC<WorkspaceListProps> = ({workspaces, isLoading, error, deleteWorkspace}) => {

    const [height, setHeight] = useState<number>(0)

    const listRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        if (listRef.current) {
            setHeight(window.screen.availHeight - listRef.current.getBoundingClientRect().top - 75)
        }
    }, [listRef.current, workspaces])

    return (
        <div>
            {isLoading
                ?
                <div className="workspace__not">
                    <MyLoader/>
                </div>
                :
                <div>
                    {workspaces.length > 0
                        ?
                        <div ref={listRef} style={{height: height}} className="workspace__list">
                            {workspaces.map(workspace =>
                                <WorkspaceListItem
                                    deleteWorkspace={deleteWorkspace}
                                    key={workspace.id} workspace={workspace}
                                />
                            )}
                        </div>
                        :
                        <div className="workspace__not">У вас пока нет рабочих пространств</div>
                    }
                </div>
            }
        </div>
    );
};

export default WorkspaceList;