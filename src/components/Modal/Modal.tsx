import React from 'react';
import './Modal.css';
import Button from "../Button";


export type ModalType = {
    modalTitle: string
    active: boolean
    title: string
    author: string
    year: string
    image: string
    buttonTitle: string
    setTitle: (title: string) => void
    setAuthor: (author: string) => void
    setYear: (year: string) => void
    setImage: (image: string) => void
    setModalActive: (active: boolean) => void
    callBack: ()=>void
}

const Modal = (props: ModalType) => {
    const  onClickHandler = ()=>{
        props.callBack()
    }

    return (
        <div className={props.active ? 'modal active' : 'modal'}>
            <div className={props.active ? 'modal-content active' : 'modal-content'}>
                <div className={'addBookHeader'}>{props.modalTitle}</div>
                <hr/>
                <div>Наименование</div>
                <input value={props.title} onChange={(e) => {
                    props.setTitle(e.currentTarget.value)
                }}/>
                <div>Автор</div>
                <input value={props.author} onChange={(e) => {
                    props.setAuthor(e.currentTarget.value)
                }}/>
                <div>Год издания</div>
                <input className={'year'} value={props.year} onChange={(e) => {
                    props.setYear(e.currentTarget.value)
                }}/>
                <div>Изображение</div>
                <input value={props.image} onChange={(e) => {
                    props.setImage(e.currentTarget.value)
                }}/>
                <div className={'modal-button'}>
                    <div><button onClick={onClickHandler}>{props.buttonTitle}</button></div>
                    <Button title={'Отменить'} callBack={() => props.setModalActive(false)}/>
                </div>

            </div>

        </div>
    );
};

export default Modal;