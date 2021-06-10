import axios, { AxiosResponse } from "axios";
import IBook from "../data_interface/IBook";
import { IDelete } from "../data_interface/IResponse";
import IGenre, { IGenreWithScore } from "../data_interface/IGenre";

const BOOK_API_BASE_URL = "http://localhost:8080/api/book";
const ALL_BOOK = "/books"
const ADD_BOOK = "/addBook";
const FIND_BOOK = "/findBook/";
const UPDATE_BOOK = "/updateBook";
const DELETE_BOOK = "/deleteBook/";
const LIKE_BOOK = "/likeBook/";
const DISLIKE_BOOK = "/dislikeBook/";
const GENRE_WITH_SCORE = "/bookGenresWithScore/";

class BookHelpers{
    /**
     * get all books
     * @returns all items in book table
     */
    getAllBooks(): Promise<AxiosResponse<IBook[]>>{
        return axios.get(BOOK_API_BASE_URL + ALL_BOOK);
    }

    /**
     * create an item in book table
     * 
     * @param book book which will be created
     * @returns created book
     */
    createBook(book:IBook, genres: IGenre[]): Promise<AxiosResponse<IBook>>{
        return axios.post(BOOK_API_BASE_URL + ADD_BOOK, {book, genres});
    }

    /**
     * get item of book table with id equal to bookId
     * 
     * @param bookId id of the book
     * @returns book the id equal to bookId
     */
    getBookById(bookId: number): Promise<AxiosResponse<IBook>>{
        return axios.get(BOOK_API_BASE_URL + FIND_BOOK + bookId);
    }

    /**
     * update a book item
     * 
     * @param book book information (must contain idBook)
     * @returns updated book
     */
    updateBook(book: IBook, genres: IGenre[]): Promise<AxiosResponse<IBook>>{
        return axios.put(BOOK_API_BASE_URL + UPDATE_BOOK, {book, genres});
    }

    /**
     * delete book item with the id equal to bookId
     * 
     * @param bookId id of the book
     * @returns data.deleted = true if delete succeed
     */
    deleteBook(bookId: number): Promise<AxiosResponse<IDelete>>{
        return axios.delete(BOOK_API_BASE_URL + DELETE_BOOK + bookId);
    }

    /**
     * update audience tag of a book (which have an id equal to bookId) to take into account the like
     * 
     * @param bookId id of the book
     * @param userId id of the user
     * @returns audience tag updated
     */
    likeBook(bookId: any, userId: number): Promise<AxiosResponse<Record<string, number>>>{
        return axios.put(BOOK_API_BASE_URL + LIKE_BOOK + bookId + "&"+ userId);
    }

    /**
     * update audience tag of a book (which have an id equal to bookId) to take into account the dislike
     * 
     * @param bookId id of the book
     * @param userId id of the user
     * @returns audience tag updated
     */
    dislikeBook(bookId: any, userId: number): Promise<AxiosResponse<Record<string, number>>>{
        return axios.put(BOOK_API_BASE_URL + DISLIKE_BOOK + bookId +"&"+ userId);
    }

    /**
     * get all the genres associated to the book
     * 
     * @param bookId id of the book
     * @returns all genre associated to the book with the corresponding score
     */
    genresWithScore(bookId:number):Promise<AxiosResponse<IGenreWithScore[]>>{
        return axios.get(BOOK_API_BASE_URL + GENRE_WITH_SCORE + bookId);
    }

    isAuthor(bookId:number, userId:number):Promise<AxiosResponse<boolean>>{
        return axios.get(BOOK_API_BASE_URL + "/isAuthor/" + userId + "&" + bookId)
    }
}

export default new BookHelpers()