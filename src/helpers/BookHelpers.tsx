import React from "react";
import axios, { AxiosResponse } from "axios";
import IBook from "../data_interface/IBook";

const BOOK_API_BASE_URL = "http://localhost:8080/api/v1/book";
const ALL_BOOK = "/books"
const ADD_BOOK = "/addBook";
const FIND_BOOK = "/findBook/";
const UPDATE_BOOK = "/updateBook/";
const DELETE_BOOK = "/deleteUser/";
const LIKE_BOOK = "/likeBook/";
const DISLIKE_BOOK = "/dislikeBook/";

class BookHelpers{
    getAllBooks(): Promise<AxiosResponse<IBook[]>>{
        return axios.get(BOOK_API_BASE_URL + ALL_BOOK);
    }

    createBook(book: IBook){
        return axios.post(BOOK_API_BASE_URL + ADD_BOOK, book)
    }

    getBookById(bookId: number): Promise<AxiosResponse<IBook>>{
        return axios.get(BOOK_API_BASE_URL + FIND_BOOK + bookId)
    }

    updateBook(book: IBook, bookId: number){
        return axios.put(BOOK_API_BASE_URL + UPDATE_BOOK + bookId, book)
    }

    deleteBook(bookId: number){
        return axios.delete(BOOK_API_BASE_URL + DELETE_BOOK + bookId)
    }

    likeBook(bookId: number, userId: number){
        return axios.put(BOOK_API_BASE_URL + LIKE_BOOK + bookId, userId)
    }

    dislikeBook(bookId: number, userId: number){
        return axios.put(BOOK_API_BASE_URL + DISLIKE_BOOK + bookId, userId)
    }
}

export default new BookHelpers()