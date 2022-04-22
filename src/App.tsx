import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import TableOfBooks from "./components/TableOfBooks";
import Header from "./components/Header";
import Button from "./components/Button";
import Modal from "./components/Modal/Modal";

export type BooksType = {
    id: string
    image: string
    title: string
    author: string
    year: string
}

function App() {

    const [books, setBooks] = useState<Array<BooksType>>([
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
    let [title, setTitle] = useState('')
    let [author, setAuthor] = useState('')
    let [image, setImage] = useState('')
    let [year, setYear] = useState('')


    //функция добавления книги

    const addBook = (title: string, author: string, year: string, image: string) => {
        const NewBook: BooksType = {
            id: v1(),
            title: title,
            author: author,
            year: year,
            image: image
        }
        setBooks([NewBook, ...books])
        setModalActive(false)
        setTitle('')
        setAuthor('')
        setYear('')
        setImage('')
    }


    //функция удаления
    const removeBook = (id: string) => {
        let FilteredBooks = books.filter(t => t.id !== id)
        setBooks(FilteredBooks)
    }

    //вызов окна редактирования
    const editBook = (id: string, image: string, title: string, author: string, year: string) => {
        let currentBook = books.find((e) => e.id === id)
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
