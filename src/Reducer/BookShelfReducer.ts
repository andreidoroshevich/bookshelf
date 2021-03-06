import {BooksType} from "../App";
import {v1} from "uuid";


export type ActionType = AddNewBookType | RemoveBookACType | GetStateACType | editBookACType

export const BookShelfReducer = (state: BooksType[], action: ActionType) => {


    switch (action.type) {
        case "ADD-NEW-BOOK": {
            const NewBook: BooksType = {
                id: action.payload.id,
                title: action.payload.title,
                author: action.payload.author,
                year: action.payload.year,
                image: action.payload.image
            }
            return [
                NewBook, ...state
            ]
        }
        case "REMOVE-BOOK": {
            return state.filter(t => t.id !== action.payload.id)
        }
        case "EDIT-BOOK": {
            let stateCopy = [...state]
            let currentBook = stateCopy.find((b: BooksType) => b.id === action.payload.id)
            if (currentBook) {
                currentBook.image = action.payload.image
                currentBook.title = action.payload.title
                currentBook.author = action.payload.author
                currentBook.year = action.payload.year
            }
            return stateCopy
        }

        case "GET-STATE": {
            return (
                JSON.parse(localStorage.getItem('books') || '')
            )
        }
        default:
            return state
    }
}

type AddNewBookType = ReturnType<typeof addNewBookAC>
export const addNewBookAC = (title: string, author: string, year: string, image: string) => {
    return {
        type: "ADD-NEW-BOOK",
        payload: {
            id: v1(),
            title,
            author,
            year,
            image,
        }
    } as const
}

type editBookACType = ReturnType<typeof editBookAC>
export const editBookAC = (id: string, image: string, title: string, author: string, year: string) => {
    return {
        type: "EDIT-BOOK",
        payload: {
            id,
            image,
            title,
            author,
            year,
        }
    } as const
}

type RemoveBookACType = ReturnType<typeof removeBookAC>
export const removeBookAC = (id: string) => {
    return {
        type: "REMOVE-BOOK",
        payload: {
            id
        }
    } as const
}

type GetStateACType = ReturnType<typeof getStateAC>
export const getStateAC = () => {
    return {
        type: "GET-STATE",
    } as const
}


