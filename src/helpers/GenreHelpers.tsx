import React from "react";
import axios, { AxiosResponse } from "axios";
import IGenre from "../data_interface/IGenre";

const GENRE_API_BASE_URL = "http://localhost:8080/api/genre"

class GenreHelpers{
    getAllGenres():Promise<AxiosResponse<IGenre[]>>{
        return axios.get(GENRE_API_BASE_URL + "/allGenres");
    }

    getGenreById(genreId: number):Promise<AxiosResponse<IGenre>> {
        return axios.get(GENRE_API_BASE_URL + "/findGenre/" + genreId);
    }
}

export default new GenreHelpers()