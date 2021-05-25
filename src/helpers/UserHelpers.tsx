import React from "react";
import axios, { AxiosResponse } from "axios";
import IUser from "../data_interface/IUser";
import { IDelete } from "../data_interface/IResponse";
import { IBookWithProgress } from "../data_interface/IBook";

const USER_API_BASE_URL = "http://localhost:8080/api/user"


class UserHelpers{
    getAllUsers(): Promise<AxiosResponse<IUser>>{
        return axios.get(USER_API_BASE_URL + "/allUser");
    }

    createUser(user: IUser, list: string[]): Promise<AxiosResponse<IUser>> {
        return axios.post(USER_API_BASE_URL + "/addUser", {user, list});
    }

    getUserById(userId: number): Promise<AxiosResponse<IUser>>{
        return axios.get(USER_API_BASE_URL + "/findUser/" + userId);
    }

    updateUser(user: IUser, userId: number): Promise<AxiosResponse<IUser>>{
        return axios.put(USER_API_BASE_URL + "/updateUser/" + userId, user);
    }

    deleteUser(userId: number): Promise<AxiosResponse<IDelete>>{
        return axios.delete(USER_API_BASE_URL + "/deleteUser/" + userId);
    }

    getUserReadBooks(userId:number): Promise<AxiosResponse<IBookWithProgress>>{
        return axios.get(USER_API_BASE_URL + "/getUserReadBooks/" + userId);
    }
}

export default new UserHelpers()