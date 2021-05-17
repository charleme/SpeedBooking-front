import React from "react";
import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/user"


class UserHelpers{
    getAllUsers(){
        return axios.get(USER_API_BASE_URL + "/users");
    }

    createUser(user: any){
        return axios.post(USER_API_BASE_URL + "/addUser", user)
    }

    getUserById(userId: number){
        return axios.get(USER_API_BASE_URL + "/findUser/" + userId)
    }

    updateUser(user: any, userId: number){
        return axios.put(USER_API_BASE_URL + "/updateUser/" + userId, user)
    }

}

export default new UserHelpers()