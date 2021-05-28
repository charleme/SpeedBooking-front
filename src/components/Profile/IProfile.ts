import IBook from "../../data_interface/IBook";
import IGenre from "../../data_interface/IGenre";
import {RouteComponentProps} from "react-router-dom";

export interface IProfileProps extends RouteComponentProps{
    
}

export interface IProfileStates{
    userName: string;
    email:string;
    genres?: IGenre[];
    books: IBook[];
    language: string;
}

