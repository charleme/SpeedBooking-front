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

export interface ITextField{
    name: string;
    label: string;
    onChange: (e:any) => void;
    autocomplete:string;
    default: String;
}