import React, {useState} from 'react';
import Button from "./Button";
import {BooksType} from "../App";
import Modal from "./Modal/Modal";

type BookType = {
    book: BooksType
    removeBook: (id: string) => void
    editBook: (id: string, image: string, title: string, author: string, year: string) => void
}

const Book = (props: BookType) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [image, setImage] = useState('')
    const [year, setYear] = useState('')
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

    const editBookHandler = () => {
        props.editBook(props.book.id, image, title, author, year)
        setModalActive(false)
    }

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

            <Modal
                modalTitle={'Редактировать книгу'}
                active={modalActive}
                title={title}
                author={author}
                year={year}
                image={image}
                buttonTitle={'Сохранить'}
                setTitle={setTitle}
                setAuthor={setAuthor}
                setYear={setYear}
                setImage={setImage}
                setModalActive={setModalActive}
                callBack={editBookHandler}
            />
        </>

    );
};

export default Book;