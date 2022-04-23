import React from 'react';
import {BooksType} from "../App";
import './Modal/Modal.css';
import Book from "./Book";

type TableOfBooksType = {
    books: Array<BooksType>
    removeBook: (id: string) => void
    editBook: (id: string, image: string, title: string, author: string, year: string) => void

}

const TableOfBooks = (props: TableOfBooksType) => {

    return (

        <table>
            {props.books.map(b =>
                <Book book={b} key={b.id} removeBook={props.removeBook} editBook={props.editBook}/>
            )}
        </table>
    );
};

export default TableOfBooks;