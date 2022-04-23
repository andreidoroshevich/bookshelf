import React, {useEffect, useReducer, useState} from 'react';
import './App.css';
import {v1} from "uuid";
import TableOfBooks from "./components/TableOfBooks";
import Header from "./components/Header";
import Button from "./components/Button";
import Modal from "./components/Modal/Modal";
import {addNewBookAC, BookShelfReducer, getStateAC, removeBookAC} from "./Reducer/BookShelfReducer";

export type BooksType = {
    id: string
    image: string
    title: string
    author: string
    year: string
}

function App() {

    const [books, booksDispatch] = useReducer(BookShelfReducer, [
        {
            id: v1(),
            title: "Изучаем программирование на JavaScript",
            author: "Эрик Фримен, Элизабет Робсон",
            year: "2017",
            image: "https://ordamed.academy/wp-content/uploads/2021/10/book-2.jpg",

        },
        {
            id: v1(),
            title: "Секреты JavaScript ниндзя",
            author: "Джон Резик, Беэр Бибо",
            year: "2015",
            image: "https://ordamed.academy/wp-content/uploads/2021/10/book-2.jpg",

        },
        {
            id: v1(),
            title: "ES6 и не только",
            author: "Кайл Симпсон",
            year: "2014",
            image: "https://ordamed.academy/wp-content/uploads/2021/10/book-2.jpg",

        }
    ])
    const [modalActive, setModalActive] = useState(false)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [image, setImage] = useState('')
    const [year, setYear] = useState('')

    useEffect(() => {
        booksDispatch(getStateAC());
    }, []);
    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(books));
    }, [books]);

    //функция добавления книги
    const addBook = (title: string, author: string, year: string, image: string) => {
        booksDispatch(addNewBookAC(title, author, year, image))
        setModalActive(false)
        setTitle('')
        setAuthor('')
        setYear('')
        setImage('')
    }

    //функция удаления
    const removeBook = (id: string) => {
        booksDispatch(removeBookAC(id))
    }

    //вызов окна редактирования
    const editBook = (id: string, image: string, title: string, author: string, year: string) => {
        let currentBook = books.find((b: BooksType) => b.id === id)
        if (currentBook) {
            currentBook.image = image
            currentBook.title = title
            currentBook.author = author
            currentBook.year = year
        }
    }

    return (
        <div className="App">
            <Header title={'Книжная полка'}/>
            <Button className={'addButton'}
                    title={'Добавить книгу'}
                    callBack={() => {
                        setModalActive(true)
                    }}/>
            <TableOfBooks
                books={books}
                removeBook={removeBook}
                editBook={editBook}
            />

            <Modal active={modalActive}>

                <div className={'addBookHeader'}>Добавить книгу</div>
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
                        addBook(title, author, year, image)
                    }}/>
                    <Button title={'Отменить'} callBack={() => setModalActive(false)}/>
                </div>
            </Modal>
        </div>
    );
}

export default App;
