import IUser from "./IUser";
import IUserBook from "./IUserBook";
import IGenreBook from "./IGenreBook";

export default interface IBook{
    idBook?: number;
    titleBook: string;
    language: string;
    imageBook: string;
    summaryBook: string;
    firstChapter?: string; //Optionnal because big data so some request don't need to send this data
    audienceTag: Record<string, number>;
    links: Record<string, string>;
    id_author?:number;
}

export interface IBookWithProgress extends IBook{
    progress: number;
}