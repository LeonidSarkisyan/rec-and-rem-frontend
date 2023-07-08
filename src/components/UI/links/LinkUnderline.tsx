import React, {FC} from 'react';
import './LinkUnderline.css'
import {Link} from "react-router-dom";


interface LinkUnderlineProps {
    text: string
    url?: string
    onClick?(): void
}

const LinkUnderline: FC<LinkUnderlineProps> = ({text, url, onClick}) => {

    function clickHandler() {
        if (onClick) {
            onClick()
        }
    }

    return (
        <span className={'link'} onClick={clickHandler}>
            {url ? <Link to={url}>{text}</Link>
                 : <>{text}</>
            }
        </span>
    );
};

export default LinkUnderline;