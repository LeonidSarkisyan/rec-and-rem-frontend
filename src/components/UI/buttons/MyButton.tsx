import React, {FC} from 'react';
import './MyButton.css'


interface MyButtonProps {
    children: React.ReactNode,
    onClick(): void
}

const MyButton: FC<MyButtonProps> = ({children, onClick}) => {
    return (
        <div className={'button'} onClick={onClick}>
            {children}
        </div>
    );
};

export default MyButton;