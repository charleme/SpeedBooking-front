import axios, { AxiosResponse } from "axios";
import { ICreated } from "../data_interface/IResponse";

const USER_BOOK_API_BASE_URL = "http://localhost:8080/api/userbook"
const GET_USER_BOOK_PROGRESS = "/getUserBookProgress/";
const UPDATE_PROGRESS = "/updateProgress/";
const CREATE_USER_BOOK = "/createUserBook/";

class UserBookHelpers{
    getProgress(idUser: number, idBook: number): Promise<AxiosResponse<number>>{
        return axios.get(USER_BOOK_API_BASE_URL + GET_USER_BOOK_PROGRESS + idUser + "&" + idBook);
    }

    updateProgress(idUser: number, idBook: number, progressValue: number): Promise<AxiosResponse<number>>{
        return axios.put(USER_BOOK_API_BASE_URL + UPDATE_PROGRESS + idUser + "&" + idBook + "&" + progressValue);
    }

    createUserBook(idUser: number, idBook: any): Promise<AxiosResponse<ICreated>>{
        return axios.post(USER_BOOK_API_BASE_URL + CREATE_USER_BOOK + idUser + "&" + idBook);
    }
}

export default new UserBookHelpers()