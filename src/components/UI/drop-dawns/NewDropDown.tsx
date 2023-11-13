import React, {FC, useEffect, useMemo, useRef} from 'react';
import './NewDropDown.css'


interface NewDropDownProps {
    isOpen: boolean
    children: React.ReactNode
}


const NewDropDown: FC<NewDropDownProps> = ({isOpen, children}) => {

    return (
        <div className="new__drop__down" style={{display: isOpen ? "block" : "none"}}>
            {children}
        </div>
    );
};

export default NewDropDown;