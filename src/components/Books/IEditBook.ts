import {RouteComponentProps} from "react-router-dom";
import IBook from "../../data_interface/IBook";

export interface IEditBookProps extends RouteComponentProps{
    
}

export interface IEditBookStates{
    book?:IBook;
}