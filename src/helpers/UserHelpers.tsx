import React from "react";
import axios from "axios";
import IUser from "../data_interface/IUser";

const USER_API_BASE_URL = "http://localhost:8080/api/user"


class UserHelpers{
    getAllUsers(){
        return axios.get(USER_API_BASE_URL + "/allUser");
    }

    createUser(user: IUser){
        return axios.post(USER_API_BASE_URL + "/addUser", user)
    }

    getUserById(userId: number){
        return axios.get(USER_API_BASE_URL + "/findUser/" + userId)
    }

    updateUser(user: IUser, userId: number){
        return axios.put(USER_API_BASE_URL + "/updateUser/" + userId, user)
    }

    deleteUser(userId: number){
        return axios.delete(USER_API_BASE_URL + "/deleteUser/" + userId)
    }
}

export default new UserHelpers()