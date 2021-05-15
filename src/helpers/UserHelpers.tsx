import React from "react";
import axios from "axios";

const ALL_USER_API_BASE_URL = "http://localhost:8080/api/v1/users"

class UserHelpers{
    getAllUsers(){
        return axios.get(ALL_USER_API_BASE_URL);
    }
}

export default new UserHelpers()