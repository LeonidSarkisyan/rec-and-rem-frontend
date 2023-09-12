import React, {FC} from 'react';
import './MyButton.css'


interface MyButtonProps {
    children: React.ReactNode,
    onClick(): void
}

const MyButton: FC<MyButtonProps> = ({children, onClick, ...props}) => {
    return (
        <div className={'button'} onClick={onClick} {...props}>
            {children}
        </div>
    );
};

export default MyButton;