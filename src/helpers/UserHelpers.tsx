import React from "react";
import axios from "axios";

const ALL_USER_API_BASE_URL = "http://localhost:8080/api/user"


class UserHelpers{
    getAllUsers(){
        return axios.get(ALL_USER_API_BASE_URL + "/users");
    }

    createUser(user: any){
        return axios.post(ALL_USER_API_BASE_URL + "/addUser", user)
    }


}

export default new UserHelpers()