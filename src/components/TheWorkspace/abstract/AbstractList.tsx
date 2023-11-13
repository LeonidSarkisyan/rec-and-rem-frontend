import React, {FC} from 'react';
import {Abstract} from "../../../types/abstract";
import AbstractListItem from "./AbstractListItem";
import './AbstractList.css'
import {Folder} from "../../../types/folder";


interface AbstractListProps {
    abstracts: Abstract[]
    folder: Folder
    deleteAbstract(abstractId: number): void
    chooseAbstract(abstract: Abstract, folder: Folder): void
}


const AbstractList: FC<AbstractListProps> = ({abstracts, deleteAbstract, chooseAbstract, folder}) => {

    return (
        <div className="abstract__list">
            {abstracts.map(abstract =>
                <AbstractListItem
                    folder={folder}
                    key={abstract.id}
                    chooseAbstract={chooseAbstract}
                    deleteAbstract={deleteAbstract}
                    abstract={abstract}
                />
            )}
        </div>
    );
};

export default AbstractList;