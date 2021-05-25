import React from "react";
import axios, { AxiosResponse } from "axios";
import IUser from "../data_interface/IUser";

const USER_BOOK_API_BASE_URL = "http://localhost:8080/api/userbook"

const GET_USER_BOOK_PROGRESS = "/getUserBookProgress/";
class UserBookHelpers{
    getProgress(idUser: number, idBook: number): Promise<AxiosResponse<number>>{
        return axios.get(USER_BOOK_API_BASE_URL + GET_USER_BOOK_PROGRESS + idUser + "&" + idBook);
    }

    updateProgress(idUser: number, idBook: number, progressValue: number): Promise<AxiosResponse<any>>{
        return axios.put(USER_BOOK_API_BASE_URL + "/updateProgress/" + idUser + "&" + idBook + "&" + progressValue);
    }

    createUserBook(idUser: number, idBook: number): Promise<AxiosResponse<any>>{
        return axios.post(USER_BOOK_API_BASE_URL + "/createUserBook/" + idUser + "&" + idBook);
    }
}

export default new UserBookHelpers()