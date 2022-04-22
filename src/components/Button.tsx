import React from 'react';

export type ButtonType = {
    title: string
    callBack: ()=>void
    className?: string
}

const Button = (props: ButtonType) => {
    const  onClickHandler = ()=>{
        props.callBack()
    }

    return (
        <div><button onClick={onClickHandler}>{props.title}</button></div>
    );
};

export default Button;