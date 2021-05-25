import React from "react";
import axios, { AxiosResponse } from "axios";
import { ICreated } from "../data_interface/IResponse";

const GENRE_BOOK_API_BASE_URL = "http://localhost:8080/api/genrebook"

const GET_USER_BOOK_PROGRESS = "/getGenreBookScore/";
const UPDATE_SCORE = "/updateScore/";
const CREATE_GENRE_BOOK = "/createGenreBook/";
class GenreBookHelpers{
    /**
     * get score of a genre for a book
     * 
     * @param idGenre id of the genre
     * @param idBook id of the book
     * @returns the score associated to the item in the GenreBook table which have id_genre label equal to idGenre and id_book label equal to idBook
     */
    getScore(idGenre: number, idBook: number): Promise<AxiosResponse<number>>{
        return axios.get(GENRE_BOOK_API_BASE_URL + GET_USER_BOOK_PROGRESS + idGenre + "&" + idBook);
    }

    /**
     * Update score value of a item of the table GenreBook
     * 
     * @param idGenre id of the genre
     * @param idBook id of the book
     * @param scoreValue new score value
     * @returns update the score value to scoreValue for the item which have id_genre label equal to idGenre and id_book label equal to idBook 
     */
    updateScore(idGenre: number, idBook: number, scoreValue: number): Promise<AxiosResponse<number>>{
        return axios.put(GENRE_BOOK_API_BASE_URL + UPDATE_SCORE + idGenre + "&" + idBook + "&" + scoreValue);
    }

    /**
     * create an item in the table GenreBook
     * 
     * @param idGenre id of the genre
     * @param idBook id of the book
     * @param score score value
     * @returns true if created
     */
    createGenreBook(idGenre: number, idBook: number, score: number): Promise<AxiosResponse<ICreated>>{
        return axios.post(GENRE_BOOK_API_BASE_URL + CREATE_GENRE_BOOK + idGenre + "&" + idBook + "&" + score);
    }
}

export default new GenreBookHelpers()