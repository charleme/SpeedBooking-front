import { RouteComponentProps } from "react-router-dom";
import IBook from "../../data_interface/IBook";
import IGenre from "../../data_interface/IGenre";

export interface IBookFormProps  extends RouteComponentProps{
    book?: IBook;
    onSubmitHandler: (book: IBook) => void;
    edit: boolean;
}

export interface IBookFormStates{
    titleBook: string;
    language: string;
    imageBook: string;
    summaryBook: string;
    firstChapter?:  string;
    links: ILink[];
    genres: IGenre[];
    openDialog:boolean;
}

export interface ILink{
    name: string;
    url: string;
}