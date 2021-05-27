import IBook from "../../data_interface/IBook";
import IGenre from "../../data_interface/IGenre";

export interface IProfileProps{
    
}

export interface IProfileStates{
    userName: string;
    email:string;
    genres?: IGenre[];
    books: IBook[];
    language: string;
}

