import {RouteComponentProps} from "react-router-dom";
import IBook from "../../data_interface/IBook";
import IGenre from "../../data_interface/IGenre";

export interface IEditBookProps extends RouteComponentProps{
    
}

export interface IEditBookStates{
    book?:IBook;
    genres?:IGenre[];
}