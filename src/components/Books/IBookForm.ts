import IBook from "../../data_interface/IBook";
import IGenre from "../../data_interface/IGenre";

export interface IBookFormProps{
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
    links: Record<string, string>;
    genres: IGenre[];
    openDialog:boolean;
}