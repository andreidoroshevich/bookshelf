import React, {useState} from 'react';
import './Modal.css';
import Button from "../Button";


export type ModalType = {
    active: boolean
    children: any
}

const Modal = (props: ModalType) => {

    return (
        <div className={props.active ? 'modal active' : 'modal'}>
            <div className={props.active ? 'modal-content active' : 'modal-content'}>
                {props.children}
            </div>

        </div>
    );
};

export default Modal;