import React from "react";
import axios, { AxiosResponse } from "axios";
import IUser from "../data_interface/IUser";

const USER_API_BASE_URL = "http://localhost:8080/api/user"


class UserHelpers{
    getAllUsers():  Promise<AxiosResponse<IUser>>{
        return axios.get(USER_API_BASE_URL + "/allUser");
    }

    createUser(user: IUser): Promise<AxiosResponse<any>>{
        return axios.post(USER_API_BASE_URL + "/addUser", user);
    }

    getUserById(userId: number): Promise<AxiosResponse<IUser>>{
        return axios.get(USER_API_BASE_URL + "/findUser/" + userId);
    }

    updateUser(user: IUser, userId: number): Promise<AxiosResponse<any>>{
        return axios.put(USER_API_BASE_URL + "/updateUser/" + userId, user);
    }

    deleteUser(userId: number): Promise<AxiosResponse<any>>{
        return axios.delete(USER_API_BASE_URL + "/deleteUser/" + userId);
    }

    getUserReadBooks(userId:number): Promise<AxiosResponse<any>>{
        return axios.get(USER_API_BASE_URL + "/getUserReadBooks/" + userId);
    }
}

export default new UserHelpers()