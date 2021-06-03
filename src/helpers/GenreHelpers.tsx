import React from "react";
import axios from "axios";

const GENRE_API_BASE_URL = "http://localhost:8080/api/genre"

class GenreHelpers{
    getAllGenres(){
        return axios.get(GENRE_API_BASE_URL + "/allGenres");
    }

    getGenreById(genreId: any) {
        return axios.get(GENRE_API_BASE_URL + "/findGenre/" + genreId);
    }
}

export default new GenreHelpers()