import React, {useState} from 'react';
import Button from "./Button";
import Modal from "./Modal/Modal";
import {BooksType} from "../App";

type BookType = {
    book: BooksType
    removeBook: (id: string) => void
    editBook: (id: string, image: string, title: string, author: string, year: string) => void
}

const Book = (props: BookType) => {

    const [modalActive, setModalActive] = useState(false)

    const onClickRemoveBookHandler = (id: string) => {
        props.removeBook(id)
    }

    const onClickEditBookHandler = (id: string) => {
        setModalActive(true)
        setTitle(props.book.title)
        setAuthor(props.book.author)
        setImage(props.book.image)
        setYear(props.book.year)
    }

    let [title, setTitle] = useState('')
    let [author, setAuthor] = useState('')
    let [image, setImage] = useState('')
    let [year, setYear] = useState('')

    return (
        <>
            <tr>
                <td className={'photo'}>
                    <img alt={'bookImage'} src={props.book.image}/>
                </td>
                <td className={'description'}>
                    <div className={'book_title'}>{props.book.title}</div>
                    <div className={'book_author'}>{props.book.author}</div>
                    <div className={'book_year'}>{props.book.year}</div>
                </td>
                <td className={'buttons'}>
                    <Button title={'Редактировать'} callBack={() => {
                        onClickEditBookHandler(props.book.id)
                    }}/>
                    <Button title={'Удалить'} callBack={() => {
                        onClickRemoveBookHandler(props.book.id)
                    }}/>
                </td>
            </tr>
            <Modal active={modalActive}>
                <div className={'addBookHeader'}>Редактировать книгу</div>
                <hr/>
                <div>Наименование</div>
                <input value={title} onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}/>
                <div>Автор</div>
                <input value={author} onChange={(e) => {
                    setAuthor(e.currentTarget.value)
                }}/>
                <div>Год издания</div>
                <input className={'year'} value={year} onChange={(e) => {
                    setYear(e.currentTarget.value)
                }}/>
                <div>Изображение</div>
                <input value={image} onChange={(e) => {
                    setImage(e.currentTarget.value)
                }}/>
                <div className={'modal-button'}>
                    <Button title={'Сохранить'} callBack={() => {
                        props.editBook(props.book.id, image, title, author, year)
                        setModalActive(false)
                    }}/>
                    <Button title={'Отменить'} callBack={() => setModalActive(false)
                    }/>
                </div>
            </Modal>
        </>

    );
};

export default Book;