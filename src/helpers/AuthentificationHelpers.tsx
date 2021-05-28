import axios from "axios";
import React from "react";

const AUTHENTIFICATION_API_BASE_URL = "http://localhost:8080/api/connection"

class AuthentificationHelpers{
    authenticate(email:string, password:string){
        return axios.get(AUTHENTIFICATION_API_BASE_URL + "/connect/" + email + "&" + password );
    }
}

export default new AuthentificationHelpers()