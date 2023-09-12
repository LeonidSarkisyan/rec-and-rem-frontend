import React, {FC} from 'react';
import './MyLoader.css'
import {useAdditionCSSClass} from "../../../hooks/useAdditionCSSClass";


interface MyLoaderProps {
    className?: string,
}


const MyLoader: FC<MyLoaderProps> = ({className}) => {

    const classes = useAdditionCSSClass('loader', className)

    return (
        <div className={classes}>
            
        </div>
    );
};

export default MyLoader;