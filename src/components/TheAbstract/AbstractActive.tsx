import React, {FC, useEffect, useState} from 'react';
import './AbstractActive.css'
import {Abstract} from "../../types/abstract";
import {useFetching} from "../../hooks/useFetching";
import AbstractContent from "./AbstractContent";
import AbstractNotChoose from "./AbstractNotChoose";
import AbstractContentUpdate from "./AbstractContentUpdate";
import {Folder} from "../../types/folder";


interface AbstractActiveProps {
    abstract?: Abstract
    folder?: Folder
}


const AbstractActive: FC<AbstractActiveProps> = ({abstract, folder}) => {

    return (
        <>
            {!abstract ?
                <div className="abstract__active">
                    <AbstractNotChoose/>
                </div>
                :
                <AbstractContentUpdate abstract={abstract} folder={folder}/>
            }
        </>

    );
};

export default AbstractActive;