import React from "react";
import axios, { AxiosResponse } from "axios";

const GENRE_BOOK_API_BASE_URL = "http://localhost:8080/api/genrebook"

const GET_USER_BOOK_PROGRESS = "/getGenreBookScore/";
const UPDATE_SCORE = "/updateScore/";
const CREATE_GENRE_BOOK = "/createGenreBook/";
class GenreBookHelpers{
    getScore(idGenre: number, idBook: number): Promise<AxiosResponse<number>>{
        return axios.get(GENRE_BOOK_API_BASE_URL + GET_USER_BOOK_PROGRESS + idGenre + "&" + idBook);
    }

    updateScore(idGenre: number, idBook: number, progressValue: number): Promise<AxiosResponse<any>>{
        return axios.put(GENRE_BOOK_API_BASE_URL + UPDATE_SCORE + idGenre + "&" + idBook + "&" + progressValue);
    }

    createGenreBook(idGenre: number, idBook: number, score: number): Promise<AxiosResponse<any>>{
        return axios.post(GENRE_BOOK_API_BASE_URL + CREATE_GENRE_BOOK + idGenre + "&" + idBook + "&" + score);
    }
}

export default new GenreBookHelpers()